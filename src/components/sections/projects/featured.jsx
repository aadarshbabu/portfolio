import FeaturedProject from '@/components/blocks/projects/featured'


// Section structure
import Section from '@/components/structure/section';
import Container from '@/components/structure/container';
import Badges from '@/components/utils/badge.list.util'
import Icon from '@/components/utils/icon.util'
import SectionTitle from '@/components/blocks/section.title.block'

import css from '@/styles/sections/projects/featured.module.scss'
import content from '@/content/projects/featured.json'

export default function FeaturedProjects() {

	return (
		<Section classProp={css.hasBg}>
			<Container spacing={'verticalXXXXLrg'}>
				<SectionTitle
					title="Featured Projects"
					preTitle="UI and Full Stack"
					subTitle="Focused on the experience, driven by the engineering."
				/> 				{
					content.map((data, index) => {
						return (
							<FeaturedProject content={data} index={index} key={index} />
						)
					})
				}
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