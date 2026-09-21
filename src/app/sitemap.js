export default async function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aadarshsingh.in';
	const wpAPIURL =
		process.env.NEXT_PUBLIC_WORDPRESS_URL ||
		'https://public-api.wordpress.com/wp/v2/sites/itrate.wordpress.com/posts';

	// Static routes
	const staticRoutes = [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/articles`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/case-studies`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];

	// Fetch dynamic blog article routes for search engine indexing
	let articleRoutes = [];
	try {
		const res = await fetch(`${wpAPIURL}?per_page=100`, {
			next: { revalidate: 86400 },
		});
		if (res.ok) {
			const posts = await res.json();
			if (Array.isArray(posts)) {
				articleRoutes = posts.map((post) => ({
					url: `${baseUrl}/articles/${post.slug}`,
					lastModified: new Date(post.modified || post.date || new Date()),
					changeFrequency: 'monthly',
					priority: 0.8,
				}));
			}
		}
	} catch (error) {
		console.error('Error generating sitemap article routes:', error);
	}

	return [...staticRoutes, ...articleRoutes];
}
