import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  schema: {
    types: schemaTypes,
  },
  name: 'saintstephensca',
  title: 'Saint Stephen-in-the-Fields',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .title('Site Settings')
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Navigation')
              .child(
                S.document()
                  .title('Main Navigation')
                  .schemaType('navigation')
                  .documentId('mainNavigation')
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(S.documentList().title('Pages').filter('_type == "page"')),
            S.listItem()
              .title('Alerts')
              .child(S.documentList().title('Alerts').filter('_type == "alert"')),
            S.listItem()
              .title('Sidebar Widgets')
              .child(S.documentList().title('Sidebar Widgets').filter('_type == "sidebarWidget"')),
          ]),
    }),
  ],
});
