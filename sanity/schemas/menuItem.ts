export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
      description: 'Navigation label (overrides page title if set)',
    },
    {
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Select the page to link to',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'children',
      title: 'Dropdown Items',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Sort order (lower numbers appear first)',
    },
  ],
  preview: {
    select: {
      label: 'label',
      pageTitle: 'page.title',
      children: 'children',
    },
    prepare({
      label,
      pageTitle,
      children,
    }: {
      label: string;
      pageTitle?: string;
      children?: unknown[];
    }) {
      return {
        title: label || pageTitle || 'Untitled',
        subtitle:
          children && children.length > 0 ? `${children.length} submenu items` : 'No submenu',
      };
    },
  },
};
