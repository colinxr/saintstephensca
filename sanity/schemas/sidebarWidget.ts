export default {
  name: 'sidebarWidget',
  title: 'Sidebar Widget',
  type: 'object',
  fields: [
    { name: 'widgetType', title: 'Widget Type', type: 'string', options: {
      list: [
        { title: 'Service Schedule', value: 'serviceSchedule' },
        { title: 'Donation', value: 'donation' },
        { title: 'Social Links', value: 'social' },
        { title: 'Badge', value: 'badge' }
      ]
    }},
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'linkText', title: 'Link Text', type: 'string' },
    { name: 'linkUrl', title: 'Link URL', type: 'url' }
  ]
}
