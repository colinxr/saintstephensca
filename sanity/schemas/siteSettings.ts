export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'churchName', title: 'Church Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'headerImage', title: 'Header Image', type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', title: 'Alt Text', type: 'string' }
    ] },
    { name: 'navigation', title: 'Navigation', type: 'array', of: [{ type: 'menuItem' }] },
    { name: 'footerCopyright', title: 'Footer Copyright', type: 'string' },
    { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string' },
      { name: 'url', type: 'url' }
    ]}]},
    { name: 'donationLink', title: 'Donation Link', type: 'url' }
  ]
}