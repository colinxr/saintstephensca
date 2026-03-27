import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { previewPlugin } from 'sanity-plugin-preview'

export default defineConfig({
  name: 'saintstephensca',
  title: 'Saint Stephen-in-the-Fields',
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(S.documentList().title('Pages').filter('_type == "page"')),
            S.listItem()
              .title('Navigation')
              .child(S.documentList().title('Navigation').filter('_type == "navigation"')),
            S.listItem()
              .title('Alerts')
              .child(S.documentList().title('Alerts').filter('_type == "alert"')),
            S.listItem()
              .title('Sidebar Blocks')
              .child(S.documentList().title('Sidebar Blocks').filter('_type == "sidebarBlock"')),
          ]),
    }),
    previewPlugin({
      previewUrl: '/preview'
    })
  ]
})
