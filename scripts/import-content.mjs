#!/usr/bin/env node
/**
 * Sanity Content Import Script
 *
 * This script imports content from content.md into Sanity CMS.
 * It creates pages, sidebar widgets, and site settings.
 *
 * Usage:
 *   SANITY_STUDIO_PROJECT_ID=xxx SANITY_API_TOKEN=xxx node scripts/import-content.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID;
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production';
const TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error(
    'Error: SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN environment variables are required'
  );
  console.error('');
  console.error('Example usage:');
  console.error(
    '  SANITY_STUDIO_PROJECT_ID=xxx SANITY_API_TOKEN=xxx node scripts/import-content.mjs'
  );
  process.exit(1);
}

// Initialize Sanity client
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to create portable text blocks from plain text
function textToBlocks(text) {
  if (!text || !text.trim()) return [];

  // Split into paragraphs and create block nodes
  const paragraphs = text.split('\n\n').filter((p) => p.trim());

  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `block_${index}_${Date.now()}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `span_${index}_${Date.now()}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

// Helper to create a page document
function createPage(title, slug, contentBlocks, sidebarWidgetRefs = []) {
  const doc = {
    _type: 'page',
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    mainContent: contentBlocks,
  };

  if (sidebarWidgetRefs.length > 0) {
    doc.sidebarWidgets = sidebarWidgetRefs.map((ref) => ({
      _type: 'reference',
      _ref: ref,
    }));
  }

  return doc;
}

// Helper to create a sidebar widget
function createSidebarWidget(widgetType, title, contentBlocks, linkText = null, linkUrl = null) {
  const doc = {
    _type: 'sidebarWidget',
    widgetType,
    title,
    content: contentBlocks,
  };

  if (linkText) doc.linkText = linkText;
  if (linkUrl) doc.linkUrl = linkUrl;

  return doc;
}

// Main import function
async function importContent() {
  console.log('Starting content import...\n');

  try {
    // Read content file
    const contentPath = join(__dirname, '..', '.context', 'content.md');
    const content = readFileSync(contentPath, 'utf-8');

    // Track created documents
    const createdDocs = [];
    const widgetRefs = {};

    // Create sidebar widgets first (we'll reference them in pages)
    console.log('Creating sidebar widgets...');

    // Service Schedule Widget
    const serviceScheduleWidget = createSidebarWidget(
      'serviceSchedule',
      'Service Schedule',
      textToBlocks(`Sunday: Sung Mass at 10:30 am
Saturday: Online service on Zoom at 7 pm
Wednesday: Said Mass at noon
Monday-Tuesday-Wednesday: Evening Prayer at 4:30 pm`)
    );
    const serviceScheduleDoc = await client.create(serviceScheduleWidget);
    widgetRefs.serviceSchedule = serviceScheduleDoc._id;
    createdDocs.push({
      type: 'sidebarWidget',
      title: 'Service Schedule',
      id: serviceScheduleDoc._id,
    });
    console.log('  ✓ Service Schedule widget created');

    // Donation Widget
    const donationWidget = createSidebarWidget(
      'donation',
      'Support Our Work',
      textToBlocks(
        `Your donations help us continue our outreach programs, weekend breakfast program, and support for vulnerable community members. Make your cheque payable to The Church of Saint Stephen-in-the-Fields or donate through PayPal.`
      ),
      'Donate Now',
      'https://www.paypal.com'
    );
    const donationDoc = await client.create(donationWidget);
    widgetRefs.donation = donationDoc._id;
    createdDocs.push({ type: 'sidebarWidget', title: 'Support Our Work', id: donationDoc._id });
    console.log('  ✓ Donation widget created');

    // Social Links Widget
    const socialWidget = createSidebarWidget(
      'social',
      'Connect With Us',
      textToBlocks('Follow us on social media for updates on services, events, and community news.')
    );
    const socialDoc = await client.create(socialWidget);
    widgetRefs.social = socialDoc._id;
    createdDocs.push({ type: 'sidebarWidget', title: 'Connect With Us', id: socialDoc._id });
    console.log('  ✓ Social Links widget created');

    // Create Pages
    console.log('\nCreating pages...');

    // Parse content sections
    const sections = parseContentSections(content);

    // Homepage
    if (sections.homepage) {
      const homepageContent = [
        {
          _type: 'block',
          _key: `heading_${Date.now()}`,
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: `span_${Date.now()}`,
              text: "Welcome to St. Stephen's",
              marks: [],
            },
          ],
        },
        ...textToBlocks(sections.homepage),
      ];

      const homepage = createPage('Home', 'home', homepageContent, [
        widgetRefs.serviceSchedule,
        widgetRefs.donation,
        widgetRefs.social,
      ]);
      const homepageDoc = await client.create(homepage);
      createdDocs.push({ type: 'page', title: 'Home', id: homepageDoc._id });
      console.log('  ✓ Homepage created');
    }

    // Contact Page
    if (sections.contact) {
      const contactContent = buildContactContent(sections.contact);
      const contact = createPage('Contact Us', 'contact', contactContent, [widgetRefs.donation]);
      const contactDoc = await client.create(contact);
      createdDocs.push({ type: 'page', title: 'Contact Us', id: contactDoc._id });
      console.log('  ✓ Contact page created');
    }

    // Clergy and Staff Page
    if (sections.clergy) {
      const clergyContent = buildClergyContent(sections.clergy);
      const clergy = createPage('Clergy and Staff', 'clergy-and-staff', clergyContent, [
        widgetRefs.serviceSchedule,
      ]);
      const clergyDoc = await client.create(clergy);
      createdDocs.push({ type: 'page', title: 'Clergy and Staff', id: clergyDoc._id });
      console.log('  ✓ Clergy and Staff page created');
    }

    // Worship Page
    if (sections.worship) {
      const worshipContent = buildWorshipContent(sections.worship, sections.children);
      const worship = createPage('Worship', 'worship', worshipContent, [
        widgetRefs.serviceSchedule,
      ]);
      const worshipDoc = await client.create(worship);
      createdDocs.push({ type: 'page', title: 'Worship', id: worshipDoc._id });
      console.log('  ✓ Worship page created');
    }

    // Livestream Archive Page
    if (sections.livestream) {
      const livestreamContent = buildLivestreamContent(sections.livestream);
      const livestream = createPage('Livestream Archive', 'livestream-archive', livestreamContent);
      const livestreamDoc = await client.create(livestream);
      createdDocs.push({ type: 'page', title: 'Livestream Archive', id: livestreamDoc._id });
      console.log('  ✓ Livestream Archive page created');
    }

    // Outreach Page
    if (sections.outreach) {
      const outreachContent = buildOutreachContent(
        sections.outreach,
        sections.breakfast,
        sections.safespace
      );
      const outreach = createPage('Outreach', 'outreach', outreachContent, [widgetRefs.donation]);
      const outreachDoc = await client.create(outreach);
      createdDocs.push({ type: 'page', title: 'Outreach', id: outreachDoc._id });
      console.log('  ✓ Outreach page created');
    }

    // Our Neighbourhood Page
    if (sections.neighbourhood) {
      const neighbourhoodContent = buildNeighbourhoodContent(
        sections.neighbourhood,
        sections.poverty
      );
      const neighbourhood = createPage(
        'Our Neighbourhood',
        'our-neighbourhood',
        neighbourhoodContent
      );
      const neighbourhoodDoc = await client.create(neighbourhood);
      createdDocs.push({ type: 'page', title: 'Our Neighbourhood', id: neighbourhoodDoc._id });
      console.log('  ✓ Our Neighbourhood page created');
    }

    // Arts Page
    if (sections.art) {
      const artsContent = buildArtsContent(sections.art, sections.readings, sections.music);
      const arts = createPage('Arts', 'arts', artsContent);
      const artsDoc = await client.create(arts);
      createdDocs.push({ type: 'page', title: 'Arts', id: artsDoc._id });
      console.log('  ✓ Arts page created');
    }

    // Create Site Settings
    console.log('\nCreating site settings...');
    const siteSettings = {
      _type: 'siteSettings',
      churchName: 'Saint Stephen-in-the-Fields',
      tagline: 'An inclusive and affirming Anglican community in the heart of Toronto',
      address: '103 Bellevue Avenue\nToronto, Ontario\nCanada\nM5T 2N8',
      footerCopyright: `© ${new Date().getFullYear()} Saint Stephen-in-the-Fields. All rights reserved.`,
      donationLink: 'https://www.paypal.com',
    };
    const siteSettingsDoc = await client.create(siteSettings);
    createdDocs.push({ type: 'siteSettings', title: 'Site Settings', id: siteSettingsDoc._id });
    console.log('  ✓ Site settings created');

    // Summary
    console.log('\n========================================');
    console.log('Import completed successfully!');
    console.log('========================================');
    console.log(`\nTotal documents created: ${createdDocs.length}`);
    console.log('\nBreakdown:');

    const byType = createdDocs.reduce((acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1;
      return acc;
    }, {});

    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    console.log('\nYou can now view your content in Sanity Studio.');
  } catch (error) {
    console.error('\nError during import:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
    process.exit(1);
  }
}

// Parse content.md into sections
function parseContentSections(content) {
  const sections = {};

  // Split by headers
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    const headerMatch = line.match(/^#+\s+(.+)$/);

    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }

      // Start new section
      const header = headerMatch[1].toLowerCase();
      currentContent = [];

      if (header.includes('homepage') || header === 'home') {
        currentSection = 'homepage';
      } else if (header.includes('contact')) {
        currentSection = 'contact';
      } else if (header.includes('clergy') || header.includes('staff')) {
        currentSection = 'clergy';
      } else if (header === 'worship') {
        currentSection = 'worship';
      } else if (header === 'children') {
        currentSection = 'children';
      } else if (header.includes('livestream') || header.includes('video')) {
        currentSection = 'livestream';
      } else if (header === 'outreach') {
        currentSection = 'outreach';
      } else if (header.includes('breakfast')) {
        currentSection = 'breakfast';
      } else if (header.includes('safe space')) {
        currentSection = 'safespace';
      } else if (header.includes('neighbourhood') || header.includes('neighborhood')) {
        currentSection = 'neighbourhood';
      } else if (header.includes('poverty')) {
        currentSection = 'poverty';
      } else if (header.includes('art in common')) {
        currentSection = 'art';
      } else if (header.includes('readings') || header.includes('concerts')) {
        currentSection = 'readings';
      } else if (header.includes('music') || header.includes('recordings')) {
        currentSection = 'music';
      } else {
        currentSection = header.replace(/\s+/g, '_');
      }
    } else {
      if (currentSection && line.trim()) {
        currentContent.push(line);
      }
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

// Build contact page content
function buildContactContent(contactText) {
  const blocks = [];

  // Email section
  const emailMatch = contactText.match(/Email[\s\S]*?(?=Telephone|$)/i);
  if (emailMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `email_heading_${Date.now()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Email', marks: [] }],
      },
      {
        _type: 'block',
        _key: `email_content_${Date.now()}`,
        style: 'normal',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'click here', marks: ['link'] },
        ],
        markDefs: [
          {
            _type: 'link',
            _key: `link_${Date.now()}`,
            href: 'mailto:maggie@web.net',
          },
        ],
      }
    );
  }

  // Telephone section
  const phoneMatch = contactText.match(/Telephone[\s\S]*?(?=Donations|$)/i);
  if (phoneMatch) {
    const phoneText = phoneMatch[0].replace('Telephone', '').trim();
    blocks.push(
      {
        _type: 'block',
        _key: `phone_heading_${Date.now()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Telephone', marks: [] }],
      },
      ...textToBlocks(phoneText)
    );
  }

  // Donations section
  const donationsMatch = contactText.match(/Donations[\s\S]*?(?=Location|$)/i);
  if (donationsMatch) {
    const donationsText = donationsMatch[0].replace('Donations', '').trim();
    blocks.push(
      {
        _type: 'block',
        _key: `donations_heading_${Date.now()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Donations', marks: [] }],
      },
      ...textToBlocks(donationsText)
    );
  }

  // Location section
  const locationMatch = contactText.match(/Location[\s\S]*?$/i);
  if (locationMatch) {
    const locationText = locationMatch[0].replace('Location', '').trim();
    blocks.push(
      {
        _type: 'block',
        _key: `location_heading_${Date.now()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Location', marks: [] }],
      },
      ...textToBlocks(locationText)
    );
  }

  return blocks;
}

// Build clergy page content
function buildClergyContent(clergyText) {
  const blocks = [];

  // Maggie Helwig
  const maggieMatch = clergyText.match(
    /Maggie Helwig[\s\S]*?(?=Elizabeth Cummings|Rev'd Elizabeth|$)/i
  );
  if (maggieMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `maggie_heading_${Date.now()}`,
        style: 'h3',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: "Rev'd Canon Maggie Helwig - Rector",
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: `maggie_email_${Date.now()}`,
        style: 'normal',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Email: ', marks: [] },
          { _type: 'span', _key: `span2_${Date.now()}`, text: 'maggie@web.net', marks: ['link'] },
        ],
        markDefs: [
          {
            _type: 'link',
            _key: `link_${Date.now()}`,
            href: 'mailto:maggie@web.net',
          },
        ],
      },
      ...textToBlocks(
        maggieMatch[0]
          .replace(/Maggie Helwig.*?(?=\n)/, '')
          .replace('maggie@web.net', '')
          .trim()
      )
    );
  }

  // Elizabeth Cummings
  const elizabethMatch = clergyText.match(/Elizabeth Cummings[\s\S]*?(?=Noah Lamanna|$)/i);
  if (elizabethMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `elizabeth_heading_${Date.now()}`,
        style: 'h3',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: "Rev'd Elizabeth Cummings - Parish Deacon",
            marks: [],
          },
        ],
      },
      ...textToBlocks(elizabethMatch[0].replace(/Elizabeth Cummings.*?(?=\n)/, '').trim())
    );
  }

  // Noah Lamanna
  const noahMatch = clergyText.match(/Noah Lamanna[\s\S]*?(?=Andrea Budgey|Rev'd Andrea|$)/i);
  if (noahMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `noah_heading_${Date.now()}`,
        style: 'h3',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: 'Noah Lamanna - Outreach Worker',
            marks: [],
          },
        ],
      },
      ...textToBlocks(noahMatch[0].replace(/Noah Lamanna.*?(?=\n)/, '').trim())
    );
  }

  // Andrea Budgey
  const andreaMatch = clergyText.match(/Andrea Budgey[\s\S]*?(?=Rev'd Max|Janet Nichols|$)/i);
  if (andreaMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `andrea_heading_${Date.now()}`,
        style: 'h3',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: "Rev'd Canon Andrea Budgey - Honorary Assistant",
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: `andrea_email_${Date.now()}`,
        style: 'normal',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Email: ', marks: [] },
          {
            _type: 'span',
            _key: `span2_${Date.now()}`,
            text: 'chaplain@trinity.utoronto.ca',
            marks: ['link'],
          },
        ],
        markDefs: [
          {
            _type: 'link',
            _key: `link_${Date.now()}`,
            href: 'mailto:chaplain@trinity.utoronto.ca',
          },
        ],
      },
      ...textToBlocks(
        andreaMatch[0]
          .replace(/Andrea Budgey.*?(?=\n)/, '')
          .replace('chaplain@trinity.utoronto.ca', '')
          .trim()
      )
    );
  }

  // Max Price
  const maxMatch = clergyText.match(/Rev'd Max Price[\s\S]*?(?=Janet Nichols|$)/i);
  if (maxMatch) {
    blocks.push({
      _type: 'block',
      _key: `max_heading_${Date.now()}`,
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: `span_${Date.now()}`,
          text: "Rev'd Max Price - Honorary Assistant",
          marks: [],
        },
      ],
    });
  }

  // Janet Nichols
  const janetMatch = clergyText.match(
    /Janet Nichols[\s\S]*?(?=Those appointed|Rector's Warden|$)/i
  );
  if (janetMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `janet_heading_${Date.now()}`,
        style: 'h3',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: 'Janet Nichols - Parish Administrator',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: `janet_email_${Date.now()}`,
        style: 'normal',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Email: ', marks: [] },
          {
            _type: 'span',
            _key: `span2_${Date.now()}`,
            text: 'parishsecretary.ststephen@gmail.com',
            marks: ['link'],
          },
        ],
        markDefs: [
          {
            _type: 'link',
            _key: `link_${Date.now()}`,
            href: 'mailto:parishsecretary.ststephen@gmail.com',
          },
        ],
      }
    );
  }

  // Vestry info
  const vestryMatch = clergyText.match(
    /Those appointed at the March 2024 Vestry[\s\S]*?(?=Advisory Board|$)/i
  );
  if (vestryMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `vestry_heading_${Date.now()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Vestry 2024', marks: [] }],
      },
      ...textToBlocks(
        vestryMatch[0].replace('Those appointed at the March 2024 Vestry:', '').trim()
      )
    );
  }

  // Advisory Board
  const boardMatch = clergyText.match(/Advisory Board:[\s\S]*?(?=Delegate to Synod|$)/i);
  if (boardMatch) {
    blocks.push(
      {
        _type: 'block',
        _key: `board_heading_${Date.now()}`,
        style: 'h3',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Advisory Board', marks: [] },
        ],
      },
      ...textToBlocks(boardMatch[0].replace('Advisory Board:', '').trim())
    );
  }

  return blocks;
}

// Build worship page content
function buildWorshipContent(worshipText, childrenText) {
  const blocks = [];

  // Sunday service
  blocks.push(...textToBlocks(worshipText));

  // Children section
  if (childrenText) {
    blocks.push(
      {
        _type: 'block',
        _key: `children_heading_${Date.now()}`,
        style: 'h2',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Children in Worship', marks: [] },
        ],
      },
      ...textToBlocks(childrenText)
    );
  }

  return blocks;
}

// Build livestream page content
function buildLivestreamContent(livestreamText) {
  const blocks = [];

  // Extract the intro
  const introMatch = livestreamText.match(
    /We recorded our livestreamed services[\s\S]*?(?=Liturgical years|$)/i
  );
  if (introMatch) {
    blocks.push(...textToBlocks(introMatch[0].trim()));
  }

  // Add note about current services
  blocks.push({
    _type: 'block',
    _key: `current_services_${Date.now()}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `span_${Date.now()}`,
        text: 'Current services continue on Zoom every Saturday evening. Contact us for log-in details.',
        marks: [],
      },
    ],
  });

  return blocks;
}

// Build outreach page content
function buildOutreachContent(outreachText, breakfastText, safespaceText) {
  const blocks = [];

  // Community Health Team
  blocks.push(
    {
      _type: 'block',
      _key: `cht_heading_${Date.now()}`,
      style: 'h2',
      children: [
        { _type: 'span', _key: `span_${Date.now()}`, text: 'Community Health Team', marks: [] },
      ],
    },
    ...textToBlocks(outreachText)
  );

  // Weekend Breakfast Program
  if (breakfastText) {
    blocks.push(
      {
        _type: 'block',
        _key: `breakfast_heading_${Date.now()}`,
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: 'Weekend Breakfast Program',
            marks: [],
          },
        ],
      },
      ...textToBlocks(breakfastText.replace(/PayPal[\s\S]*$/i, '').trim())
    );
  }

  // Safe Space Drop In
  if (safespaceText) {
    blocks.push(
      {
        _type: 'block',
        _key: `safespace_heading_${Date.now()}`,
        style: 'h2',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Safe Space Drop In', marks: [] },
        ],
      },
      ...textToBlocks(safespaceText)
    );
  }

  return blocks;
}

// Build neighbourhood page content
function buildNeighbourhoodContent(neighbourhoodText, povertyText) {
  const blocks = [];

  blocks.push(...textToBlocks(neighbourhoodText));

  if (povertyText) {
    blocks.push(
      {
        _type: 'block',
        _key: `poverty_heading_${Date.now()}`,
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: `span_${Date.now()}`,
            text: 'Poverty and Income Inequality',
            marks: [],
          },
        ],
      },
      ...textToBlocks(povertyText.replace(/Evening prayer.*?shelter/gi, '').trim())
    );
  }

  return blocks;
}

// Build arts page content
function buildArtsContent(artText, readingsText, musicText) {
  const blocks = [];

  // Art in Common
  if (artText) {
    blocks.push(
      {
        _type: 'block',
        _key: `art_heading_${Date.now()}`,
        style: 'h2',
        children: [{ _type: 'span', _key: `span_${Date.now()}`, text: 'Art in Common', marks: [] }],
      },
      ...textToBlocks(artText.replace(/Art in Common\s*/, ''))
    );
  }

  // Readings and Concerts
  if (readingsText) {
    blocks.push(
      {
        _type: 'block',
        _key: `readings_heading_${Date.now()}`,
        style: 'h2',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Readings and Concerts', marks: [] },
        ],
      },
      ...textToBlocks(readingsText)
    );
  }

  // Music Recordings
  if (musicText) {
    blocks.push(
      {
        _type: 'block',
        _key: `music_heading_${Date.now()}`,
        style: 'h2',
        children: [
          { _type: 'span', _key: `span_${Date.now()}`, text: 'Music Recordings', marks: [] },
        ],
      },
      ...textToBlocks(
        musicText
          .replace(/Music recordings\s*/, '')
          .replace(/Audio and video recordings.*?St Stephen's\./, '')
          .trim()
      )
    );
  }

  return blocks;
}

// Run the import
importContent();
