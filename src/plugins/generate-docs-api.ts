import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {Plugin} from '@docusaurus/types';
import type {LoadContext} from '@docusaurus/types';

interface DocFile {
  id: string;
  title: string;
  url: string;
  content: string;
  frontmatter: Record<string, unknown>;
  section: string;
  path: string;
}

interface Section {
  id: string;
  title: string;
  url: string;
  items: DocFile[];
}

function generateDocsApiPlugin(
  context: LoadContext,
  options: Record<string, unknown>
): Plugin {
  return {
    name: 'generate-docs-api',
    async postBuild(props) {
      const {outDir, siteConfig} = props;
      const {baseUrl} = siteConfig;

      const docsDir = path.join(context.siteDir, 'docs');
      const apiDir = path.join(outDir, 'api');

      if (!fs.existsSync(apiDir)) {
        fs.mkdirSync(apiDir, {recursive: true});
      }

      const docs = readDocsRecursive(docsDir, baseUrl);
      const sections = groupDocsBySection(docs, baseUrl);

      const index = {
        sections: sections.map((section) => ({
          id: section.id,
          title: section.title,
          url: section.url,
          items: section.items.map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
          })),
        })),
      };

      fs.writeFileSync(
        path.join(apiDir, 'docs-index.json'),
        JSON.stringify(index, null, 2)
      );

      for (const section of sections) {
        const sectionContent = {
          title: section.title,
          content: section.items.map((item) => item.content).join('\n\n'),
          pages: section.items.map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            content: item.content,
          })),
          relatedLinks: extractRelatedLinks(section.items),
        };

        fs.writeFileSync(
          path.join(apiDir, `${section.id}.json`),
          JSON.stringify(sectionContent, null, 2)
        );
      }

      console.log(`✓ Generated ${sections.length} section JSON files in ${apiDir}`);
    },
  };
}

function readDocsRecursive(
  dir: string,
  baseUrl: string,
  relativePath = ''
): DocFile[] {
  const files: DocFile[] = [];
  const entries = fs.readdirSync(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'img' || entry.name === 'node_modules') {
        continue;
      }
      files.push(...readDocsRecursive(fullPath, baseUrl, relPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
      entry.name !== '_category_.json'
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const {data: frontmatter, content: body} = matter(content);

      const urlPath = relPath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const url = `${cleanBaseUrl}/docs/${urlPath}`;

      const title =
        (frontmatter.title as string) ||
        extractTitle(body) ||
        entry.name.replace(/\.(md|mdx)$/, '');

      const id = entry.name
        .replace(/\.(md|mdx)$/, '')
        .replace(/[^a-z0-9-]/gi, '-')
        .toLowerCase();

      files.push({
        id,
        title,
        url,
        content: body.trim(),
        frontmatter,
        section: getSectionFromPath(relPath),
        path: relPath,
      });
    }
  }

  return files;
}

function extractTitle(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function getSectionFromPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  if (parts.length > 1) {
    return parts[0];
  }
  return 'root';
}

function groupDocsBySection(docs: DocFile[], baseUrl: string): Section[] {
  const sectionsMap = new Map<string, Section>();

  for (const doc of docs) {
    const sectionId = doc.section === 'root' ? 'root' : doc.section;

    if (!sectionsMap.has(sectionId)) {
      const baseUrlPart = doc.url.split('/docs/')[0] || baseUrl;
      const sectionUrl =
        doc.section === 'root'
          ? `${baseUrlPart}/docs`
          : `${baseUrlPart}/docs/${sectionId}`;

      sectionsMap.set(sectionId, {
        id: sectionId,
        title: formatSectionTitle(sectionId),
        url: sectionUrl,
        items: [],
      });
    }

    sectionsMap.get(sectionId)!.items.push(doc);
  }

  const sections = Array.from(sectionsMap.values());
  const sectionOrder = ['getting-started', 'concepts', 'guides', 'reference', 'root'];
  sections.sort((a, b) => {
    const aIndex = sectionOrder.indexOf(a.id);
    const bIndex = sectionOrder.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return a.id.localeCompare(b.id);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  sections.forEach((section) => {
    section.items.sort((a, b) => a.path.localeCompare(b.path));
  });

  return sections;
}

function formatSectionTitle(sectionId: string): string {
  if (sectionId === 'root') return 'Documentation';
  return sectionId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractRelatedLinks(items: DocFile[]): Array<{title: string; url: string}> {
  const links = new Set<{title: string; url: string}>();

  for (const item of items) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(item.content)) !== null) {
      const url = match[2];
      if (url.startsWith('../') || url.startsWith('./') || url.startsWith('/docs/')) {
        links.add({
          title: match[1],
          url: normalizeLink(url, item.url),
        });
      }
    }
  }

  return Array.from(links);
}

function normalizeLink(link: string, currentUrl: string): string {
  if (link.startsWith('/')) {
    return link;
  }

  const currentDir = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
  const resolved = path.resolve(currentDir, link).replace(/\\/g, '/');
  return resolved;
}

export default generateDocsApiPlugin;
