import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function WebUiPlaceholder(): ReactNode {
  return (
    <Layout
      title="Web UI Guide — Strata Docs"
      description="Documentation for the Strata Web UI (coming soon).">
      <main className="container margin-vert--xl">
        <div style={{maxWidth: '42rem', margin: '0 auto', textAlign: 'center'}}>
          <Heading as="h1">Web UI Guide</Heading>
          <p className="margin-top--md">
            Documentation for the Strata Web UI—how to use the app after
            deployment, explore data, and run self-service BI workflows—is
            coming soon.
          </p>
          <p>
            In the meantime, see{' '}
            <Link to="developer-guide">Developer Guide</Link>{' '}
            for CLI and semantic modeling, and{' '}
            <Link to="self-hosting">Self-Hosting Guide</Link> for
            installation and self-hosting.
          </p>
        </div>
      </main>
    </Layout>
  );
}
