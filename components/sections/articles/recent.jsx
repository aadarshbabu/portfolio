import Section from '../../structure/section';
import Container from '../../structure/container';
import Link from 'next/link';
import Image from 'next/image'
import SectionTitle from '../../blocks/section.title.block'
import Icon from '../../utils/icon.util'
import css from '../../../styles/sections/articles/recent.module.scss'

export default function Recent({ wpPosts }) {

	const articles = wpPosts || [];

	return (
		<Section classProp="borderBottom">
			<Container spacing={'verticalXXXXLrg'}>
				<SectionTitle
					title="Recent Articles"
					preTitle="Informative"
					subTitle="A personal quest to become a better creative writer."
				/>
				<section className={css.projects}>
					{
					articles.map((post, index) => {
						const title = post.title?.rendered || post.title;
						const date = new Date(post.date || post.pubDate).toDateString();
						const link = `/articles/${post.slug}`;
						const author = post._embedded?.author?.[0]?.name || "Author";
						const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.jetpack_featured_media_url || post.thumbnail;

						// Strip HTML and truncate to 120 chars
						const rawExcerpt = (post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim();
						const excerpt = rawExcerpt.length > 120 ? rawExcerpt.substring(0, 120).trim() + '...' : rawExcerpt;

						// Estimate read time
						const wordCount = (post.content?.rendered || '').replace(/<[^>]+>/g, '').split(/\s+/).length;
						const readTime = Math.max(1, Math.ceil(wordCount / 200));

						return (
							<Link key={index} href={link} passHref style={{ textDecoration: 'none' }}>
								<article className={css.project}>
									{thumbnail && (
										<span className={css.featuredImage}>
											<Image src={thumbnail} alt="Article thumbnail" layout="fill" objectFit="cover" />
										</span>
									)}
									<span className={css.cardBody}>
										<span className={css.header}>
											<span dangerouslySetInnerHTML={{ __html: title }} /> <Icon icon={['fad', 'arrow-up-right-from-square']} />
										</span>
										{excerpt && <p className={css.excerpt}>{excerpt}</p>}
										<span className={css.details}>
											<p className={css.author}>By {author}</p>
											<span className={css.meta}>
												<span className={css.readTime}>{readTime} min read</span>
												<p className={css.pushedAt}>{date}</p>
											</span>
										</span>
									</span>
								</article>
							</Link>
						)
					})
					}
				</section>
			</Container>
		</Section>
	)
}