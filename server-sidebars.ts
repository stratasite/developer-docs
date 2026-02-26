import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  serverSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    'quick-install',
    'manual-install',
    'ssl-reverse-proxy',
    'environment-variables',
    'upgrading',
  ],
};

export default sidebars;
