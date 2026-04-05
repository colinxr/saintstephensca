export default {
  name: 'alert',
  title: 'Alert Box',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Christmas', value: 'christmas' },
          { title: 'Urgent', value: 'urgent' },
        ],
      },
      initialValue: 'default',
    },
  ],
};
