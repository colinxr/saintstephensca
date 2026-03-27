import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (!import.meta.env.SANITY_PREVIEW_SECRET || secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  return new Response(null, { status: 307, headers: { Location: '/' } });
};
