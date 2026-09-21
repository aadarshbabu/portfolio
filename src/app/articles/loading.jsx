import Section from '@/components/structure/section';
import Container from '@/components/structure/container';

export default function ArticlesLoading() {
	return (
		<Section classProp="borderBottom">
			<Container spacing="verticalXXXXLrg">
				<div style={{ maxWidth: '1000px', margin: '0 auto', opacity: 0.6 }}>
					<div
						style={{
							height: '40px',
							width: '240px',
							background: 'var(--primary-dark)',
							borderRadius: '8px',
							marginBottom: '2rem',
							animation: 'pulse 1.5s ease-in-out infinite',
						}}
					/>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
							gap: '1.5rem',
						}}
					>
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								style={{
									height: '240px',
									background: 'var(--primary-dark)',
									borderRadius: '12px',
									animation: 'pulse 1.5s ease-in-out infinite',
								}}
							/>
						))}
					</div>
					<style>{`
						@keyframes pulse {
							0%, 100% { opacity: 0.4; }
							50% { opacity: 0.8; }
						}
					`}</style>
				</div>
			</Container>
		</Section>
	);
}
