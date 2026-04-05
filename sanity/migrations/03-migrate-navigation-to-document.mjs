import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function migrateNavigation() {
  try {
    // Get existing siteSettings with navigation
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');

    if (!siteSettings) {
      console.log('❌ No siteSettings document found');
      return;
    }

    if (!siteSettings.navigation || siteSettings.navigation.length === 0) {
      console.log('ℹ️ No navigation items to migrate in siteSettings');
      return;
    }

    console.log('📋 Found navigation items in siteSettings:', siteSettings.navigation.length);

    // Check if a main navigation document already exists
    const existingNav = await client.fetch(
      '*[_type == "navigation" && title == "Main Navigation"][0]'
    );

    if (existingNav) {
      // Update existing navigation document
      await client
        .patch(existingNav._id)
        .set({
          items: siteSettings.navigation,
        })
        .commit();
      console.log('✅ Updated existing Main Navigation document');
    } else {
      // Create new navigation document
      const newNav = await client.create({
        _type: 'navigation',
        title: 'Main Navigation',
        items: siteSettings.navigation,
      });
      console.log('✅ Created new Main Navigation document:', newNav._id);

      // Update siteSettings to reference the new navigation document
      await client
        .patch(siteSettings._id)
        .set({
          mainNavigation: {
            _type: 'reference',
            _ref: newNav._id,
          },
        })
        .unset(['navigation']) // Remove old inline navigation
        .commit();
      console.log('✅ Updated siteSettings to reference new navigation document');
    }

    console.log('\n🎉 Migration complete!');
    console.log('Navigation is now a top-level document in Sanity Studio.');
  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  }
}

migrateNavigation();
