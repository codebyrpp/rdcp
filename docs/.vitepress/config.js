import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Research Data Collector Platform',
  description: 'User Manual',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'FAQ', link: '/faq/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
        ]
      },
      {
        text: 'User Manual',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Features', link: '/guide/features' },
        ]
      },
    ]
  }
});