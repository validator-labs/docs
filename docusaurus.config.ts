import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Settings related to what we've set up for GitHub Pages and Netlify.
const githubOrg = 'validator-labs';
const githubRepo = 'docs';
const netlifySiteName = 'validator-labs-docs';

// Whether the site is being deployed to Netlify. This affects parts of the config so that the site
// is deployed corectly to each.
const deployingToNetlify = process.env['DEPLOYING_TO_NETLIFY'] === 'TRUE' || false;

const config: Config = {
  title: 'Validator Documentation',
  tagline: 'Ad hoc and continuous validation for any environment',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: deployingToNetlify ? `https://${netlifySiteName}.netlify.app` : `https://${githubOrg}.github.io/`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: deployingToNetlify ? `/` : `/${githubRepo}`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: githubOrg, // Usually your GitHub org/user name.
  projectName: githubRepo, // Usually your repo name.
  trailingSlash: false,

  // If we're deploying to Netlify, we don't want search engines to index us. This lets us use some
  // other deployment destination for production. In this case, that's GitHub Pages.
  noIndex: deployingToNetlify,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/validator-labs/docs/tree/main',
          path: 'docs',
          routeBasePath: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Validator',
      logo: {
        alt: 'Validator',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        //{ to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/orgs/validator-labs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/validator-labs'
            },
            {
              label: 'Licencing',
              href: '/licencing'
            }
          ]
        }
      ],
      copyright: `Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
