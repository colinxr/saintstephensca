import type { PortableTextBlock, PortableTextChild, PortableTextMarkDefinition } from 'sanity';
import { urlFor } from './sanity';

interface AlignedImage {
  _type: 'alignedImage';
  image: { asset: { _ref: string } };
  alignment?: 'left' | 'center' | 'right';
  caption?: string;
  alt?: string;
}

export function renderPortableText(blocks: (PortableTextBlock | AlignedImage)[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type === 'block') {
        return renderBlock(block);
      }
      if (block._type === 'alignedImage') {
        return renderAlignedImage(block);
      }
      return '';
    })
    .join('');
}

function renderBlock(block: PortableTextBlock): string {
  const text = block.children
    .map((child: PortableTextChild) => {
      let result = escapeHtml(child.text || '');

      if (child.marks?.includes('strong')) {
        result = `<strong>${result}</strong>`;
      }
      if (child.marks?.includes('em')) {
        result = `<em>${result}</em>`;
      }

      if (child.marks?.length) {
        const linkMark = child.marks.find((mark: string) => mark.startsWith('link-'));
        if (linkMark) {
          const linkValue = block.markDefs?.find(
            (def: PortableTextMarkDefinition) => def._key === linkMark
          );
          if (linkValue?.href) {
            result = `<a href="${escapeHtml(linkValue.href)}">${result}</a>`;
          }
        }
      }

      return result;
    })
    .join('');

  const style = block.style || 'normal';

  switch (style) {
    case 'h1':
      return `<h1>${text}</h1>`;
    case 'h2':
      return `<h2>${text}</h2>`;
    case 'h3':
      return `<h3>${text}</h3>`;
    case 'h4':
      return `<h4>${text}</h4>`;
    case 'h5':
      return `<h5>${text}</h5>`;
    case 'h6':
      return `<h6>${text}</h6>`;
    case 'blockquote':
      return `<blockquote>${text}</blockquote>`;
    default:
      return `<p>${text}</p>`;
  }
}

function renderAlignedImage(image: AlignedImage): string {
  const imgUrl = urlFor(image.image).width(800).auto('format').url();
  const alignment = image.alignment || 'center';
  const caption = image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : '';
  const alt = image.alt ? escapeHtml(image.alt) : '';

  return `<figure class="image-${alignment}">
    <img src="${imgUrl}" alt="${alt}" />
    ${caption}
  </figure>`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
