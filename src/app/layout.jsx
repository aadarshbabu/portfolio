import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ClientProviders from '@/components/providers/client-providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

// CSS reset
import 'the-new-css-reset/css/reset.css';

// Fontsource local font imports
import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

// Global css
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '@/styles/css/variables.css';
import '@/styles/css/global.css';

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aadarshsingh.in'),
	title: {
		default: 'Aadarsh Singh | Software Engineer & Developer',
		template: '%s | Aadarsh Singh',
	},
	description:
		'Portfolio of Aadarsh Singh — Software Engineer specializing in full-stack web development, cloud solutions, and modern software architectures.',
	keywords: [
		'Aadarsh Singh',
		'Software Engineer',
		'Full Stack Developer',
		'Portfolio',
		'Next.js',
		'React',
		'JavaScript',
		'Cloud Computing',
	],
	authors: [{ name: 'Aadarsh Singh', url: 'https://aadarshsingh.in' }],
	creator: 'Aadarsh Singh',
	publisher: 'Aadarsh Singh',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://aadarshsingh.in',
		siteName: 'Aadarsh Singh Portfolio',
		title: 'Aadarsh Singh | Software Engineer & Developer',
		description:
			'Portfolio of Aadarsh Singh — Software Engineer specializing in full-stack web development and modern architectures.',
		images: [
			{
				url: '/img/aadarshimprove.jpeg',
				width: 1200,
				height: 630,
				alt: 'Aadarsh Singh Portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Aadarsh Singh | Software Engineer & Developer',
		description:
			'Portfolio of Aadarsh Singh — Software Engineer specializing in full-stack web development and modern architectures.',
		images: ['/img/aadarshimprove.jpeg'],
		creator: '@aadarshsingh121',
	},

};

export const viewport = {
	themeColor: '#ffffff',
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Person',
			'@id': 'https://aadarshsingh.in/#person',
			name: 'Aadarsh Singh',
			url: 'https://aadarshsingh.in',
			jobTitle: 'Software Engineer',
			image: 'https://aadarshsingh.in/img/aadarshimprove.jpeg',
			sameAs: [
				'https://github.com/aadarshbabu',
				'https://medium.com/@aadarshsingh121',
			],
		},
		{
			'@type': 'WebSite',
			'@id': 'https://aadarshsingh.in/#website',
			url: 'https://aadarshsingh.in',
			name: 'Aadarsh Singh Portfolio',
			publisher: { '@id': 'https://aadarshsingh.in/#person' },
		},
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body>
				<ClientProviders>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</ClientProviders>
				<SpeedInsights />
			</body>
		</html>
	);
}
