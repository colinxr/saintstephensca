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

// Navigation structure from the existing site (prototype.html)
const navigation = [
  {
    label: 'Home',
    link: '/',
    order: 0,
  },
  {
    label: 'Contact',
    link: '/contact',
    order: 1,
  },
  {
    label: 'Worship',
    link: '/worship',
    order: 2,
  },
  {
    label: 'Outreach',
    link: '/outreach',
    order: 3,
  },
  {
    label: 'Arts',
    link: '/arts',
    order: 4,
  },
  {
    label: 'History',
    link: '/history',
    order: 5,
  },
];

// Social links from the prototype
const socialLinks = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com/ststepheninthefields',
  },
  {
    platform: 'YouTube',
    url: 'https://youtube.com/@ststepheninthefields',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/ststephenfields',
  },
];

async function createOrUpdateSiteSettings() {
  try {
    // Check if siteSettings document exists
    const existingSettings = await client.fetch('*[_type == "siteSettings"][0]');

    if (existingSettings) {
      // Update existing document
      await client
        .patch(existingSettings._id)
        .set({
          navigation,
          socialLinks,
          footerCopyright: 'Church of Saint Stephen-in-the-Fields',
        })
        .commit();
      console.log('✅ Updated existing siteSettings document');
    } else {
      // Create new document
      await client.create({
        _type: 'siteSettings',
        churchName: 'Church of Saint Stephen-in-the-Fields',
        tagline: 'Radical Anglican Community',
        address: '103 Bellevue Ave, Toronto, ON M5T 2N8',
        navigation,
        socialLinks,
        footerCopyright: 'Church of Saint Stephen-in-the-Fields',
      });
      console.log('✅ Created new siteSettings document');
    }

    console.log('📋 Navigation items created:');
    navigation.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.label} → ${item.link}`);
    });

    console.log('\n🔗 Social links created:');
    socialLinks.forEach((link, index) => {
      console.log(`  ${index + 1}. ${link.platform} → ${link.url}`);
    });
  } catch (error) {
    console.error('❌ Error creating site settings:', error.message);
    process.exit(1);
  }
}

createOrUpdateSiteSettings();
