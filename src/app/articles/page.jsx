import Recent from '@/components/sections/articles/recent';
import Color from '@/components/utils/page.colors.util';
import colors from '@/content/articles/_colors.json';

export const metadata = {
	title: 'Articles | Aadarsh Singh',
	description:
		'Technical articles, software engineering insights, tutorials, and thoughts by Aadarsh Singh.',
	openGraph: {
		title: 'Articles | Aadarsh Singh',
		description:
			'Technical articles, software engineering insights, tutorials, and thoughts by Aadarsh Singh.',
	},
};

async function getArticles() {
	const wpAPIURL =
		process.env.NEXT_PUBLIC_WORDPRESS_URL ||
		'https://public-api.wordpress.com/wp/v2/sites/itrate.wordpress.com/posts';

	try {
		const res = await fetch(`${wpAPIURL}?_embed`, {
			next: { revalidate: 600 },
		});

		if (!res.ok) {
			console.error(`Failed to fetch articles: ${res.status}`);
			return [];
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching WordPress posts:', error);
		return [];
	}
}

export default async function ArticlesPage() {
	const wpPosts = await getArticles();

	return (
		<>
			<Color colors={colors} />
			<Recent wpPosts={wpPosts} />
		</>
	);
}
