import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      churchName,
      tagline,
      address,
      headerImage,
      navigation,
      footerCopyright,
      socialLinks,
      donationLink
    }
  `);
}

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      title,
      slug,
      "alertBox": alertBox->{
        title,
        content,
        style,
        show
      },
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
  return getPageBySlug('home');
}
