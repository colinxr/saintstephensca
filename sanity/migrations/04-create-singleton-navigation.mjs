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

// Navigation structure with nested pages
const navigationStructure = {
  title: 'Main Navigation',
  items: [
    {
      label: 'Home',
      link: '/',
      order: 0,
    },
    {
      label: 'Contact',
      link: '/contact',
      order: 1,
      children: [
        {
          label: 'Address, phone and email',
          link: '/contact/address-phone-email',
          order: 0,
        },
        {
          label: 'Clergy and Staff',
          link: '/contact/clergy-and-staff',
          order: 1,
        },
      ],
    },
    {
      label: 'Worship',
      link: '/worship',
      order: 2,
      children: [
        {
          label: 'Our Weekly Services',
          link: '/worship/our-weekly-services',
          order: 0,
        },
        {
          label: 'Children',
          link: '/worship/children',
          order: 1,
        },
        {
          label: 'Livestreamed Services',
          link: '/worship/livestreamed-services',
          order: 2,
        },
      ],
    },
    {
      label: 'Outreach',
      link: '/outreach',
      order: 3,
      children: [
        {
          label: 'Weekend Drop in Program',
          link: '/outreach/weekend-drop-in-program',
          order: 0,
        },
        {
          label: 'Safe Space Drop In',
          link: '/outreach/safe-space-drop-in',
          order: 1,
        },
        {
          label: 'Our Neighbourhood',
          link: '/outreach/our-neighbourhood',
          order: 2,
        },
        {
          label: 'Poverty and Income Inequality',
          link: '/outreach/poverty-and-income-inequality',
          order: 3,
        },
      ],
    },
    {
      label: 'Arts',
      link: '/arts',
      order: 4,
      children: [
        {
          label: 'Arts in Common',
          link: '/arts/arts-in-common',
          order: 0,
        },
        {
          label: 'Readings and Concerts',
          link: '/arts/readings-and-concerts',
          order: 1,
        },
        {
          label: 'Music Recordings',
          link: '/arts/music-recordings',
          order: 2,
        },
      ],
    },
    {
      label: 'History',
      link: '/history',
      order: 5,
    },
  ],
};

async function createSingletonNavigation() {
  try {
    // Check if mainNavigation document already exists
    const existingNav = await client.fetch(
      '*[_type == "navigation" && _id == "mainNavigation"][0]'
    );

    if (existingNav) {
      // Update existing document
      await client
        .patch('mainNavigation')
        .set({
          title: navigationStructure.title,
          items: navigationStructure.items,
        })
        .commit();
      console.log('✅ Updated existing Main Navigation document');
    } else {
      // Create new singleton document with explicit _id
      await client.create({
        _id: 'mainNavigation',
        _type: 'navigation',
        title: navigationStructure.title,
        items: navigationStructure.items,
      });
      console.log('✅ Created Main Navigation singleton document');
    }

    // Update siteSettings to reference this navigation
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
    if (siteSettings) {
      await client
        .patch(siteSettings._id)
        .set({
          mainNavigation: {
            _type: 'reference',
            _ref: 'mainNavigation',
          },
        })
        .commit();
      console.log('✅ Updated siteSettings to reference Main Navigation');
    }

    console.log('\n📋 Navigation structure created:');
    navigationStructure.items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.label} → ${item.link}`);
      if (item.children && item.children.length > 0) {
        item.children.forEach((child, childIndex) => {
          console.log(`      ${childIndex + 1}. ${child.label} → ${child.link}`);
        });
      }
    });

    console.log('\n🎉 Migration complete!');
    console.log('Navigation is now a singleton in Sanity Studio.');
  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  }
}

createSingletonNavigation();
