export default {
  name: 'alignedImage',
  title: 'Aligned Image',
  type: 'object',
  fields: [
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'alignment', title: 'Alignment', type: 'string', options: {
      list: [
        { title: 'Left', value: 'left' },
        { title: 'Center', value: 'center' },
        { title: 'Right', value: 'right' }
      ]
    }},
    { name: 'caption', title: 'Caption', type: 'string' },
    { name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required().error('Alt text is required for accessibility') }
  ]
}