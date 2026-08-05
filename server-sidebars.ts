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
    {
      type: 'category',
      label: 'Authentication & SSO',
      link: { type: 'doc', id: 'authentication/index' },
      items: [
        'authentication/saml',
        'authentication/oidc',
        'authentication/jwt',
        'authentication/reverse-proxy',
      ],
    },
    'upgrading',
    'security-hardening',
    'troubleshooting-deployments',
  ],
};

export default sidebars;
