'use client';

import { useEffect, useRef } from 'react';
import Section from '@/components/structure/section';
import Container from '@/components/structure/container';
import SectionTitle from '@/components/blocks/section.title.block';
import css from '@/styles/sections/articles/article.module.scss';

export default function ArticleView({ post }) {
	const contentRef = useRef(null);

	useEffect(() => {
		if (contentRef.current) {
			const preTags = contentRef.current.querySelectorAll('pre');

			preTags.forEach((pre) => {
				// Don't add multiple wrappers/buttons
				if (pre.parentNode.classList.contains('code-wrapper')) return;

				const target = pre.querySelector('code') || pre;

				// WordPress sometimes uses CodeMirror to format code, turning lines into <div class="cm-line">
				// highlight.js strips HTML tags when reading textContent, causing these div lines to collapse.
				const cmLines = target.querySelectorAll('.cm-line');
				if (cmLines.length > 0) {
					target.textContent = Array.from(cmLines).map(line => line.textContent).join('\n');
				} else {
					target.innerHTML = target.innerHTML.replace(/<br\s*[\/]?>/gi, '\n');
				}

				// Create a wrapper div
				const wrapper = document.createElement('div');
				wrapper.className = 'code-wrapper';
				wrapper.style.position = 'relative';
				wrapper.style.margin = '2rem 0';

				// Insert wrapper before pre, then move pre inside wrapper
				pre.parentNode.insertBefore(wrapper, pre);
				wrapper.appendChild(pre);

				// Reset pre margin since wrapper handles it
				pre.style.margin = '0';

				const button = document.createElement('button');
				button.className = 'copy-btn';
				button.innerText = 'Copy';

				Object.assign(button.style, {
					position: 'absolute',
					top: '0.5rem',
					right: '0.5rem',
					background: 'rgba(128, 128, 128, 0.2)',
					color: 'white',
					border: '1px solid rgba(128, 128, 128, 0.3)',
					padding: '0.25rem 0.5rem',
					borderRadius: '0.25rem',
					cursor: 'pointer',
					fontSize: '0.75rem',
					fontFamily: 'monospace',
					opacity: '0.7',
					transition: 'all 0.2s',
					zIndex: '10'
				});

				button.onmouseover = () => button.style.opacity = '1';
				button.onmouseout = () => button.style.opacity = '0.7';

				button.onclick = () => {
					// Extract text safely
					const text = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
					navigator.clipboard.writeText(text.trim());
					button.innerText = 'Copied!';
					setTimeout(() => button.innerText = 'Copy', 2000);
				};

				wrapper.appendChild(button);
			});

			// Dynamically load highlight.js
			const script = document.createElement('script');
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
			script.onload = () => {
				if (window.hljs) {
					window.hljs.highlightAll();
				}
			};
			document.body.appendChild(script);
		}
	}, [post]);

	if (!post) {
		return <div>Loading...</div>;
	}

	const title = post.title?.rendered || post.title || '';
	const content = post.content?.rendered || '';
	const date = new Date(post.date || post.pubDate).toDateString();
	const author = post._embedded?.author?.[0]?.name || 'Author';

	return (
		<Section classProp="borderBottom">
			<Container spacing={'verticalXXXXLrg'}>
				<div className={css.articleContainer}>
					<SectionTitle
						title={<span dangerouslySetInnerHTML={{ __html: title }} />}
						preTitle={date}
						subTitle={`By ${author}`}
					/>

					<div
						ref={contentRef}
						className={css.content}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</Container>
		</Section>
	);
}
