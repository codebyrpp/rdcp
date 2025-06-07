import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Research Data Collector Platform',
  base: '/rdcp/',
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
          { text: 'Creating a New Project', link: '/guide/create-new-project' },
          { text: 'Deleting a Project', link: '/guide/delete-project' },
          { text: 'Creating a New Form', link: '/guide/getting-started' },
          { text: 'Editing and Deleting Forms', link: '/guide/editing-and-deleting-forms' },
          { text: 'Previewing and Publishing Forms', link: '/guide/preview-and-publish-forms' },
          { text: 'Viewing Form and Form Responses', link: '/guide/view-form-and-form-responses' },
          { text: 'Share a Form', link: '/guide/share-form' },
          { text: 'Form Settings', link: '/guide/form-settings' },
          { text: 'Logging Out of the System', link: '/guide/logging-out' },
          { text: 'Features', link: '/guide/features' },
        ]
      },
    ]
  }
});