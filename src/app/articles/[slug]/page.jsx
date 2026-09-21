import { notFound } from 'next/navigation';
import Color from '@/components/utils/page.colors.util';
import colors from '@/content/articles/_colors.json';
import ArticleView from '@/components/sections/articles/article-view';

const wpAPIURL =
	process.env.NEXT_PUBLIC_WORDPRESS_URL ||
	'https://public-api.wordpress.com/wp/v2/sites/itrate.wordpress.com/posts';

async function getArticle(slug) {
	try {
		const res = await fetch(`${wpAPIURL}?slug=${slug}&_embed`, {
			next: { revalidate: 600 },
		});
		if (!res.ok) return null;
		const posts = await res.json();
		return posts && posts.length > 0 ? posts[0] : null;
	} catch (e) {
		console.error('Error fetching article:', e);
		return null;
	}
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = await getArticle(slug);

	if (!post) {
		return {
			title: 'Article Not Found',
		};
	}

	const title = post.title?.rendered || post.title || 'Article';
	const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || 'Read this full article on Aadarsh Singh portfolio.';
	const description = rawExcerpt.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 160).trim() + '...';
	const cleanTitle = title.replace(/<[^>]+>/g, '').replace(/&#8211;/g, '-').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
	const thumbnail =
		post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
		post.jetpack_featured_media_url ||
		post.thumbnail ||
		'/img/default-thumbnail.jpg';
	const author = post._embedded?.author?.[0]?.name || 'Aadarsh Singh';

	return {
		title: `${cleanTitle} | Aadarsh Singh`,
		description,
		authors: [{ name: author }],
		openGraph: {
			type: 'article',
			title: cleanTitle,
			description,
			url: `https://aadarshsingh.in/articles/${slug}`,
			publishedTime: post.date || post.pubDate,
			authors: [author],
			images: [
				{
					url: thumbnail,
					alt: cleanTitle,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: cleanTitle,
			description,
			images: [thumbnail],
			creator: '@aadarshsingh121',
		},
	};
}

export default async function ArticlePage({ params }) {
	const { slug } = await params;
	const post = await getArticle(slug);

	if (!post) {
		notFound();
	}

	const title = post.title?.rendered || post.title || 'Article';
	const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || '';
	const description = rawExcerpt.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 160).trim();
	const thumbnail =
		post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
		post.jetpack_featured_media_url ||
		post.thumbnail ||
		'https://aadarshsingh.in/img/default-thumbnail.jpg';
	const author = post._embedded?.author?.[0]?.name || 'Aadarsh Singh';

	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title.replace(/<[^>]+>/g, ''),
		description,
		image: [thumbnail],
		datePublished: post.date || post.pubDate,
		dateModified: post.modified || post.date || post.pubDate,
		author: {
			'@type': 'Person',
			name: author,
			url: 'https://aadarshsingh.in',
		},
		publisher: {
			'@type': 'Person',
			name: 'Aadarsh Singh',
			url: 'https://aadarshsingh.in',
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://aadarshsingh.in/articles/${slug}`,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
			/>
			<Color colors={colors} />
			<ArticleView post={post} />
		</>
	);
}
