import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const previewClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  token: import.meta.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      churchName,
      tagline,
      address,
      diocesanLink,
      headerImage,
      "mainNavigation": mainNavigation->{
        _id,
        title,
        items[]{
          label,
          order,
          "link": page->slug.current,
          "pageTitle": page->title,
          children[]{
            label,
            order,
            "link": page->slug.current,
            "pageTitle": page->title,
            children[]{
              label,
              order,
              "link": page->slug.current,
              "pageTitle": page->title
            }
          }
        }
      },
      footerCopyright,
      socialLinks,
      donationLink,
      "globalAlert": globalAlert->{
        title,
        content,
        style
      }
    }
  `);
}

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      title,
      slug,
      mainContent,
      sidebarWidgets[]->{
        widgetType,
        title,
        content,
        linkText,
        linkUrl
      }
    }
  `,
    { slug }
  );
}

export async function getHomePage() {
  // Homepage has slug "/" in the CMS
  return getPageBySlug('/');
}

export async function getPreviewPage(slug: string) {
  return previewClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainContent,
      sidebarWidgets[]->{
        widgetType,
        title,
        content,
        linkText,
        linkUrl
      }
    }
  `,
    { slug }
  );
}
