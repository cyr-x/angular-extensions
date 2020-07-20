module.exports = {
  title: 'Angular Extensions',
  tagline: '',
  url: 'https://github.com/cyr-x',
  baseUrl: '/angular-extensions/',
  favicon: 'img/favicon.ico',
  organizationName: 'cyr-x',
  projectName: 'angular-extensions',
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/cyr-x/angular-extensions',
          label: 'GitHub',
          position: 'right',
        },
      ],
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          homePageId: 'installation',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
