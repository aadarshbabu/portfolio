import Section from '@/components/structure/section';
import Container from '@/components/structure/container';

export default function Loading() {
	return (
		<Section classProp="borderBottom">
			<Container spacing="verticalXXXXLrg">
				<div
					style={{
						minHeight: '40vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<div
						style={{
							width: '48px',
							height: '48px',
							border: '3px solid var(--primary-dark)',
							borderTop: '3px solid var(--neon-1-1)',
							borderRadius: '50%',
							animation: 'spin 0.8s linear infinite',
						}}
					/>
					<style>{`
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
					`}</style>
				</div>
			</Container>
		</Section>
	);
}
