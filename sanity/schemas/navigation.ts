export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal name for this navigation (e.g., "Main Menu")',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'menuItem' }],
      description: 'Add, reorder, or remove menu items',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }: { title: string; items?: unknown[] }) {
      return {
        title: title || 'Navigation',
        subtitle: `${items?.length || 0} menu items`,
      };
    },
  },
};
