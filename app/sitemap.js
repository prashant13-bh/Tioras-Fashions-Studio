export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tioras.com';

  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/faq',
    '/cart',
    '/login',
    '/signup',
    '/privacy-policy',
    '/terms-conditions',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // In production, you would fetch product IDs and add them here
  /*
  const products = await getProducts({ limit: 100 });
  const productRoutes = products.map(p => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'daily',
    priority: 0.6,
  }));
  */

  return [...routes];
}
