'use client';

import { useEffect } from 'react';
import Section from '@/components/structure/section';
import Container from '@/components/structure/container';

export default function GlobalError({ error, reset }) {
	useEffect(() => {
		console.error('Unhandled application error:', error);
	}, [error]);

	return (
		<Section classProp="borderBottom">
			<Container spacing="verticalXXXXLrg">
				<div
					style={{
						textAlign: 'center',
						minHeight: '40vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Something went wrong!</h2>
					<p style={{ opacity: 0.8, maxWidth: '500px' }}>
						An unexpected error occurred while loading this page. Please try again.
					</p>
					<button
						onClick={() => reset()}
						style={{
							marginTop: '1rem',
							padding: '0.75rem 1.5rem',
							borderRadius: '0.5rem',
							background: 'var(--primary)',
							color: 'var(--primary-bright)',
							border: '1px solid var(--primary-dark)',
							cursor: 'pointer',
							fontWeight: 600,
						}}
					>
						Try Again
					</button>
				</div>
			</Container>
		</Section>
	);
}
