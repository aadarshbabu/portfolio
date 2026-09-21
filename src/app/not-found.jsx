import Link from 'next/link';
import Section from '@/components/structure/section';
import Container from '@/components/structure/container';

export const metadata = {
	title: 'Page Not Found | Aadarsh Singh',
	description: 'The requested page could not be found.',
};

export default function NotFound() {
	return (
		<Section classProp="borderBottom">
			<Container spacing="verticalXXXXLrg">
				<div
					style={{
						textAlign: 'center',
						minHeight: '50vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<h1 style={{ fontSize: '3rem', fontWeight: 800 }}>404</h1>
					<p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
						Oops! The page you are looking for does not exist.
					</p>
					<Link
						href="/"
						style={{
							marginTop: '1rem',
							padding: '0.75rem 1.5rem',
							borderRadius: '0.5rem',
							background: 'var(--primary)',
							color: 'var(--primary-bright)',
							border: '1px solid var(--primary-dark)',
							textDecoration: 'none',
							fontWeight: 600,
						}}
					>
						Return Home
					</Link>
				</div>
			</Container>
		</Section>
	);
}
