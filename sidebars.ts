import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration for Strata documentation.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/index',
        'getting-started/installation',
        'getting-started/quickstart',
        'getting-started/concepts',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/index',
        'guides/creating-tables',
        'guides/fields-and-types',
        'guides/expressions',
        'guides/relationships',
        'guides/datasources',
        'guides/migrations',
        'guides/testing',
        'guides/deployment',
        'guides/ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Semantic Model',
      items: [
        'semantic-model/index',
        'semantic-model/tables',
        {
          type: 'category',
          label: 'Fields',
          items: [
            'semantic-model/fields/dimensions',
            'semantic-model/fields/measures',
            'semantic-model/fields/data-types',
            'semantic-model/fields/formatters',
          ],
        },
        {
          type: 'category',
          label: 'Expressions',
          items: [
            'semantic-model/expressions/sql',
            'semantic-model/expressions/lookups',
            'semantic-model/expressions/arrays',
          ],
        },
        {
          type: 'category',
          label: 'Relationships',
          items: [
            'semantic-model/relationships/cardinality',
            'semantic-model/relationships/join-types',
          ],
        },
        'semantic-model/imports',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/index',
        'advanced/snapshot-measures',
        'advanced/exclusions',
        'advanced/inclusions',
        'advanced/partitions',
        'advanced/cost-optimization',
        {
          type: 'category',
          label: 'Decorators',
          items: [
            'advanced/decorators/temporal',
            'advanced/decorators/window',
            'advanced/decorators/contribution',
          ],
        },
        'advanced/multi-datasource',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'category',
          label: 'CLI',
          items: [
            'reference/cli/index',
            'reference/cli/init',
            'reference/cli/datasource',
            'reference/cli/create',
            'reference/cli/deploy',
            'reference/cli/audit',
            'reference/cli/table',
          ],
        },
        {
          type: 'category',
          label: 'Schema',
          items: [
            'reference/schema/project',
            'reference/schema/datasources',
            'reference/schema/table',
            'reference/schema/relation',
            'reference/schema/migration',
            'reference/schema/test',
          ],
        },
        {
          type: 'category',
          label: 'Adapters',
          items: [
            'reference/adapters/index',
            'reference/adapters/postgres',
            'reference/adapters/snowflake',
            'reference/adapters/mysql',
            'reference/adapters/sqlserver',
            'reference/adapters/athena',
            'reference/adapters/trino',
            'reference/adapters/duckdb',
            'reference/adapters/druid',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/index',
        'examples/tpcds-tutorial',
        {
          type: 'category',
          label: 'Patterns',
          items: [
            'examples/patterns/star-schema',
            'examples/patterns/snowflake-schema',
            'examples/patterns/fact-dimension',
          ],
        },
        {
          type: 'category',
          label: 'Recipes',
          items: [
            'examples/recipes/customer-360',
            'examples/recipes/sales-analysis',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'api/index',
        'api/json-schema',
        'api/openapi',
      ],
    },
  ],
};

export default sidebars;
