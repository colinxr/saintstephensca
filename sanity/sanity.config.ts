import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

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
              .title('Alerts')
              .child(S.documentList().title('Alerts').filter('_type == "alert"')),
            S.listItem()
              .title('Sidebar Widgets')
              .child(S.documentList().title('Sidebar Widgets').filter('_type == "sidebarWidget"')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
