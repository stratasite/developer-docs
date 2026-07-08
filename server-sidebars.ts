import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  serverSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    'deployment-paths',
    'quick-install',
    'production-deployment',
    'aws-ecs-manual',
    'ssl-reverse-proxy',
    'environment-variables',
    'google-oauth',
    'upgrading',
    'security-hardening',
    'troubleshooting-deployments',
  ],
};

export default sidebars;
