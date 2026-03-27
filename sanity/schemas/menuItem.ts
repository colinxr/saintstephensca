export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'link', title: 'Link', type: 'string', description: 'Page slug or external URL', validation: (Rule) => Rule.uri({ allowRelative: true }) },
    { name: 'children', title: 'Dropdown Items', type: 'array', of: [{ type: 'menuItem' }] },
    { name: 'order', title: 'Order', type: 'number' }
  ]
}