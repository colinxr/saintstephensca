import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 });
  }
  
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  
  const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    token: import.meta.env.SANITY_API_TOKEN,
    perspective: 'previewDrafts',
    useCdn: false
  });
  
  const document = await client.fetch(`*[_type == $type && _id == $id][0]`, { type, id });
  
  const previewUrl = document?.slug?.current 
    ? `/preview/${document.slug.current}`
    : '/';
  
  return new Response(null, {
    status: 307,
    headers: { 'Location': `${previewUrl}?preview=true` }
  });
};
