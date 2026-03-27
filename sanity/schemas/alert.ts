export default {
  name: 'alert',
  title: 'Alert Box',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'show', title: 'Show', type: 'boolean', initialValue: false, description: 'Display this alert on the site' }
  ]
}