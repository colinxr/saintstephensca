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

// Page structure with content
const pagesToCreate = [
  // Top level pages
  { title: 'Home', slug: 'home', content: 'Welcome to Saint Stephen-in-the-Fields.' },
  { title: 'Contact', slug: 'contact', content: 'Get in touch with us.' },
  { title: 'Worship', slug: 'worship', content: 'Join us for worship services.' },
  { title: 'Outreach', slug: 'outreach', content: 'Our community outreach programs.' },
  { title: 'Arts', slug: 'arts', content: 'Arts and cultural events.' },
  { title: 'History', slug: 'history', content: 'The history of our church.' },

  // Contact subpages
  {
    title: 'Address, phone and email',
    slug: 'contact/address-phone-email',
    content: 'Our contact information.',
  },
  {
    title: 'Clergy and Staff',
    slug: 'contact/clergy-and-staff',
    content: 'Meet our clergy and staff.',
  },

  // Worship subpages
  {
    title: 'Our Weekly Services',
    slug: 'worship/our-weekly-services',
    content: 'Information about our weekly services.',
  },
  { title: 'Children', slug: 'worship/children', content: "Children's programs and services." },
  {
    title: 'Livestreamed Services',
    slug: 'worship/livestreamed-services',
    content: 'Watch our services online.',
  },

  // Outreach subpages
  {
    title: 'Weekend Drop in Program',
    slug: 'outreach/weekend-drop-in-program',
    content: 'Our weekend breakfast program.',
  },
  {
    title: 'Safe Space Drop In',
    slug: 'outreach/safe-space-drop-in',
    content: 'A welcoming space for all.',
  },
  {
    title: 'Our Neighbourhood',
    slug: 'outreach/our-neighbourhood',
    content: 'Our community in Kensington Market.',
  },
  {
    title: 'Poverty and Income Inequality',
    slug: 'outreach/poverty-and-income-inequality',
    content: 'Our work on poverty issues.',
  },

  // Arts subpages
  { title: 'Arts in Common', slug: 'arts/arts-in-common', content: 'Community arts initiatives.' },
  {
    title: 'Readings and Concerts',
    slug: 'arts/readings-and-concerts',
    content: 'Literary and musical events.',
  },
  {
    title: 'Music Recordings',
    slug: 'arts/music-recordings',
    content: 'Recorded music from our services.',
  },
];

// Navigation structure - references pages by slug
const navigationStructure = {
  title: 'Main Navigation',
  items: [
    { label: 'Home', slug: 'home', order: 0 },
    {
      label: 'Contact',
      slug: 'contact',
      order: 1,
      children: [
        { label: 'Address, phone and email', slug: 'contact/address-phone-email', order: 0 },
        { label: 'Clergy and Staff', slug: 'contact/clergy-and-staff', order: 1 },
      ],
    },
    {
      label: 'Worship',
      slug: 'worship',
      order: 2,
      children: [
        { label: 'Our Weekly Services', slug: 'worship/our-weekly-services', order: 0 },
        { label: 'Children', slug: 'worship/children', order: 1 },
        { label: 'Livestreamed Services', slug: 'worship/livestreamed-services', order: 2 },
      ],
    },
    {
      label: 'Outreach',
      slug: 'outreach',
      order: 3,
      children: [
        { label: 'Weekend Drop in Program', slug: 'outreach/weekend-drop-in-program', order: 0 },
        { label: 'Safe Space Drop In', slug: 'outreach/safe-space-drop-in', order: 1 },
        { label: 'Our Neighbourhood', slug: 'outreach/our-neighbourhood', order: 2 },
        {
          label: 'Poverty and Income Inequality',
          slug: 'outreach/poverty-and-income-inequality',
          order: 3,
        },
      ],
    },
    {
      label: 'Arts',
      slug: 'arts',
      order: 4,
      children: [
        { label: 'Arts in Common', slug: 'arts/arts-in-common', order: 0 },
        { label: 'Readings and Concerts', slug: 'arts/readings-and-concerts', order: 1 },
        { label: 'Music Recordings', slug: 'arts/music-recordings', order: 2 },
      ],
    },
    { label: 'History', slug: 'history', order: 5 },
  ],
};

async function createPagesAndNavigation() {
  try {
    console.log('📝 Creating pages...\n');

    const pageIds = {};

    // Create all pages
    for (const pageData of pagesToCreate) {
      // Check if page already exists
      const existingPage = await client.fetch('*[_type == "page" && slug.current == $slug][0]', {
        slug: pageData.slug,
      });

      if (existingPage) {
        console.log(`  ⚠️  Page already exists: ${pageData.title} (${pageData.slug})`);
        pageIds[pageData.slug] = existingPage._id;
      } else {
        // Create new page with slug as _id for easy reference
        const slugParts = pageData.slug.split('/');
        const docId = `page-${slugParts.join('-')}`;

        try {
          const newPage = await client.createOrReplace({
            _id: docId,
            _type: 'page',
            title: pageData.title,
            slug: {
              _type: 'slug',
              current: pageData.slug,
            },
            mainContent: [
              {
                _type: 'block',
                _key: Math.random().toString(36).substr(2, 9),
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    _key: Math.random().toString(36).substr(2, 9),
                    text: pageData.content,
                  },
                ],
              },
            ],
          });
          console.log(`  ✅ Created page: ${pageData.title} (${pageData.slug})`);
          pageIds[pageData.slug] = newPage._id;
        } catch (err) {
          console.error(`  ❌ Failed to create page ${pageData.title}:`, err.message);
        }
      }
    }

    console.log('\n🔗 Creating navigation with page references...\n');

    // Helper function to build navigation items with page references
    const buildNavItem = (item) => {
      const pageId = pageIds[item.slug];
      if (!pageId) {
        console.warn(`  ⚠️  Could not find page ID for slug: ${item.slug}`);
        return null;
      }

      const navItem = {
        _type: 'menuItem',
        label: item.label,
        page: {
          _type: 'reference',
          _ref: pageId,
        },
        order: item.order,
      };

      if (item.children && item.children.length > 0) {
        const children = item.children.map(buildNavItem).filter(Boolean);
        if (children.length > 0) {
          navItem.children = children;
        }
      }

      return navItem;
    };

    // Build navigation items
    const navigationItems = navigationStructure.items.map(buildNavItem).filter(Boolean);

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
          items: navigationItems,
        })
        .commit();
      console.log('✅ Updated existing Main Navigation document');
    } else {
      // Create new singleton document with explicit _id
      await client.create({
        _id: 'mainNavigation',
        _type: 'navigation',
        title: navigationStructure.title,
        items: navigationItems,
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

    console.log('\n📋 Navigation structure:');
    navigationStructure.items.forEach((item, index) => {
      const status = pageIds[item.slug] ? '✅' : '❌';
      console.log(`  ${status} ${index + 1}. ${item.label} → ${item.slug}`);
      if (item.children && item.children.length > 0) {
        item.children.forEach((child, childIndex) => {
          const childStatus = pageIds[child.slug] ? '✅' : '❌';
          console.log(`      ${childStatus} ${childIndex + 1}. ${child.label} → ${child.slug}`);
        });
      }
    });

    console.log('\n🎉 Migration complete!');
    console.log('All navigation items now reference actual pages in the CMS.');
  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  }
}

createPagesAndNavigation();
