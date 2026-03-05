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
    'manual-install',
    'aws-ecs-manual',
    'ssl-reverse-proxy',
    'environment-variables',
    'upgrading',
    'deployment-kit-zip',
    'operations-runbook',
    'security-hardening',
    'troubleshooting-enterprise',
  ],
};

export default sidebars;
