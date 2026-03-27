import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

const documents = {
  siteSettings: {
    _type: 'siteSettings',
    _id: 'siteSettings',
    churchName: 'Saint Stephen-in-the-Fields',
    tagline: 'Radical Anglican Community',
    address: '103 Bellevue Ave, Toronto, ON M5T 2N8',
    footerCopyright: '© 2026 Church of Saint Stephen-in-the-Fields',
    donationLink: 'https://www.paypal.com',
    navigation: [
      { _type: 'menuItem', label: 'Home', link: '/', order: 1 },
      { _type: 'menuItem', label: 'Contact', link: '/contact', order: 2 },
      { _type: 'menuItem', label: 'Worship', link: '/worship', order: 3 },
      { _type: 'menuItem', label: 'Outreach', link: '/outreach', order: 4 },
      { _type: 'menuItem', label: 'Arts', link: '/arts', order: 5 },
      { _type: 'menuItem', label: 'History', link: '/history', order: 6 }
    ],
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com' },
      { platform: 'YouTube', url: 'https://youtube.com' },
      { platform: 'Twitter', url: 'https://twitter.com' }
    ]
  },
  christmasAlert: {
    _type: 'alert',
    _id: 'christmasAlert',
    title: 'Christmas Services',
    style: 'christmas',
    show: true,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'December 24, 9 pm: Christmas Eve Mass\nDecember 25, 10:30 am: Christmas Day Service', marks: ['strong'] }
        ]
      }
    ]
  },
  weeklyServicesWidget: {
    _type: 'sidebarWidget',
    _id: 'weeklyServicesWidget',
    widgetType: 'serviceSchedule',
    title: 'Weekly Services',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Mon - Wed: Evening Prayer, 4:30pm', marks: ['strong'] }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Tuesdays: Meditation & Bible Study, 7:30pm (Zoom)', marks: ['strong'] }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Wednesdays: Said Mass, 12 noon', marks: ['strong'] }] }
    ]
  },
  donationWidget: {
    _type: 'sidebarWidget',
    _id: 'donationWidget',
    widgetType: 'donation',
    title: 'Online Donations',
    linkText: 'Donate with PayPal',
    linkUrl: 'https://www.paypal.com',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Have you thought of pre-authorized giving? Contact Janet Nichols.' }] }
    ]
  },
  socialWidget: {
    _type: 'sidebarWidget',
    _id: 'socialWidget',
    widgetType: 'social',
    title: 'Follow Us',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Follow us for events and photo galleries:' }] }
    ]
  },
  homePage: {
    _type: 'page',
    _id: 'homePage',
    title: 'Welcome to St. Stephen\'s',
    slug: { _type: 'slug', current: 'home' },
    alertBox: { _type: 'reference', _ref: 'christmasAlert' },
    mainContent: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We are an inclusive and affirming Anglican community in the heart of the city, where we strive to live out God\'s mission of compassion and justice for all people, and for all of creation.' }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We are committed to being a community of solidarity with those who have been pushed to the margins of our society, and to the task of building a better world.' }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We support and engage with the arts—music, literature, theatre, the visual arts—and welcome collaboration with working artists.' }
        ]
      }
    ]
  },
  contactPage: {
    _type: 'page',
    _id: 'contactPage',
    title: 'Contact Us',
    slug: { _type: 'slug', current: 'contact' },
    mainContent: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Email' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Parish Office: ', marks: ['strong'] },
          { _type: 'span', text: 'parishsecretary.ststephen@gmail.com' }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Telephone' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Mtr. Maggie Helwig (Pastoral & Programming): 416-526-5438', marks: ['strong'] }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Janet Nichols (Admin, Business & Rentals): 416-738-6915', marks: ['strong'] }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Donations' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Make your cheque payable to: The Church of Saint Stephen-in-the-Fields, 103 Bellevue Avenue, Toronto, Ontario, Canada, M5T 2N8.' }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Many thanks for your generosity.' }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Location' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We are located on the south side of College Street West in Toronto between Spadina and Bathurst, at the corner of Bellevue Avenue and directly across the street from Kensington Market\'s historic fire station.' }
        ]
      }
    ]
  }
}

async function migrate() {
  console.log('Starting migration...')
  console.log(`Project: ${process.env.SANITY_STUDIO_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.SANITY_STUDIO_DATASET || 'production'}`)

  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN environment variable is required')
    console.error('Get a token from https://sanity.io/manage/' + process.env.SANITY_STUDIO_PROJECT_ID + '/api')
    process.exit(1)
  }

  try {
    await client.create({
      _id: 'siteSettings',
      _type: 'siteSettings',
      ...documents.siteSettings
    })
    console.log('Created siteSettings')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('siteSettings already exists, skipping')
    } else {
      console.error('Error creating siteSettings:', err.message)
    }
  }

  try {
    await client.create(documents.christmasAlert)
    console.log('Created christmasAlert')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('christmasAlert already exists, skipping')
    } else {
      console.error('Error creating christmasAlert:', err.message)
    }
  }

  try {
    await client.create(documents.weeklyServicesWidget)
    console.log('Created weeklyServicesWidget')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('weeklyServicesWidget already exists, skipping')
    } else {
      console.error('Error creating weeklyServicesWidget:', err.message)
    }
  }

  try {
    await client.create(documents.donationWidget)
    console.log('Created donationWidget')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('donationWidget already exists, skipping')
    } else {
      console.error('Error creating donationWidget:', err.message)
    }
  }

  try {
    await client.create(documents.socialWidget)
    console.log('Created socialWidget')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('socialWidget already exists, skipping')
    } else {
      console.error('Error creating socialWidget:', err.message)
    }
  }

  try {
    await client.create(documents.homePage)
    console.log('Created homePage')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('homePage already exists, updating')
      await client.patch('homePage').set(documents.homePage).commit()
      console.log('Updated homePage')
    } else {
      console.error('Error creating homePage:', err.message)
    }
  }

  try {
    await client.create(documents.contactPage)
    console.log('Created contactPage')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('contactPage already exists, updating')
      await client.patch('contactPage').set(documents.contactPage).commit()
      console.log('Updated contactPage')
    } else {
      console.error('Error creating contactPage:', err.message)
    }
  }

  console.log('Migration complete!')
}

migrate().catch(console.error)
