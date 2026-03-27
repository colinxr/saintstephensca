export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'alertBox', title: 'Alert Box', type: 'reference', to: [{ type: 'alert' }] },
    { name: 'mainContent', title: 'Main Content', type: 'array', of: [
      { type: 'block' },
      { type: 'alignedImage' }
    ]},
    { name: 'sidebarWidgets', title: 'Sidebar', type: 'array', of: [
      { type: 'string' }
    ]}
  ]
}