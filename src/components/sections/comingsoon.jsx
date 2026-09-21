import Section 		from '@/components/structure/section';
import Container 	from '@/components/structure/container';

import css 			from '@/styles/sections/projects/featured.module.scss'

export default function ComingSoon() {
	return (
		<Section classProp={css.hasBg}>	
			<Container>
				<h2 style={{ minHeight: '500px', height: '80vh', maxHeight: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Coming Soon!
				</h2>
			</Container>
			<div className={css.bgContainer}>
				<span className={css.orbitalBg}>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
	)
}