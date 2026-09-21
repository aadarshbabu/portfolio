'use client'

import { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

import Section from '@/components/structure/section';
import Container from '@/components/structure/container';

import HeroBg from '@/components/blocks/hero.bg/bg-color-1';

import hero from '@/styles/sections/index/hero.module.scss';
import button from '@/styles/blocks/button.module.scss';

import content from '@/content/index/hero.json'


/**
 * TO DO LIST
 *
 * - Create a typog.modules.scss
 *   Load this module onto every component, and use predefined typography classes to keep typography consistent
 *
 * - space.modules.scss
 *   Load this module onto every component, and use predefined spacial classes to keep geometry consistent
 */

export default function Hero() {

	const [typingStatus, setTypingStatus] = useState('Initializing');
	const [menuOpen, setMenuOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const popoverRef = useRef(null);

	const email = (content.buttons.primary.url || '').replace(/^mailto:/i, '').split('?')[0] || 'contact@aadarshsingh.in';
	const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
	const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;
	const defaultMailUrl = `mailto:${email}`;

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		};
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') setMenuOpen(false);
		};

		if (menuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [menuOpen]);

	const handleCopyEmail = (e) => {
		e.stopPropagation();
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(email).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2200);
			}).catch(() => { });
		}
	};

	const isSecondaryExternal =
		content.buttons.secondary.leaveSite &&
		content.buttons.secondary.leaveSite !== 'false';

	return (
		<Section classProp={`${hero.section}`}>
			<Container spacing={'verticalMed'}>
				<TypeAnimation className={`${hero.preHeader}`}
					sequence={[
						content.intro.startDelay,
						() => { setTypingStatus('typing') },
						content.intro.start,
						() => { setTypingStatus('typed') },
						content.intro.deleteDelay,
						() => { setTypingStatus('deleting') },
						content.intro.end,
						() => { setTypingStatus('deleted') },
						content.intro.restartDelay,
					]}
					speed={content.intro.speed}
					deletionSpeed={content.intro.deletionSpeed}
					wrapper={content.intro.wrapper}
					repeat={Infinity}
				/>
				<section>
					<h1 className={hero.header}>
						{content.header.name}
					</h1>
					<h1 className={`${hero.header} ${hero.primaryDim}`}>
						{content.header.usp}
					</h1>
				</section>
				<section>
					<p className={`${hero.primaryBright} subtitle`}>
						{content.paragraph}
					</p>
				</section>
				<section className={hero.buttonSection}>
					<button
						type="button"
						className={`button ${button.primary}`}
						onClick={() => setMenuOpen(true)}
						aria-haspopup="dialog"
						aria-expanded={menuOpen}
					>
						{content.buttons.primary.title}
					</button>

					<a
						href={content.buttons.secondary.url}
						target={isSecondaryExternal ? '_blank' : undefined}
						rel={isSecondaryExternal ? 'noopener noreferrer' : undefined}
						className={`button ${button.secondary} ${isSecondaryExternal ? 'leaveSite' : ''}`}
					>
						{content.buttons.secondary.title}
					</a>

					{menuOpen && (
						<div
							className={hero.modalBackdrop}
							onClick={() => setMenuOpen(false)}
							role="dialog"
							aria-modal="true"
							aria-labelledby="contact-modal-title"
						>
							<div
								className={hero.modalCard}
								onClick={(e) => e.stopPropagation()}
								ref={popoverRef}
							>
								<div className={hero.modalHeader}>
									<div>
										<h3 id="contact-modal-title" className={hero.modalTitle}>
											Get in Touch
										</h3>
										<p className={hero.modalSubtitle}>
											Send me an email via your preferred webmail or mail app.
										</p>
									</div>
									<button
										type="button"
										className={hero.modalCloseBtn}
										onClick={() => setMenuOpen(false)}
										aria-label="Close dialog"
									>
										✕
									</button>
								</div>

								<div className={hero.modalEmailBar}>
									<span className={hero.emailText} title={email}>
										{email}
									</span>
									<button
										type="button"
										className={hero.copyBtn}
										onClick={handleCopyEmail}
									>
										{copied ? 'Copied! ✓' : 'Copy'}
									</button>
								</div>

								<div className={hero.modalActionList}>
									<a
										href={gmailUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={hero.modalActionItem}
										onClick={() => setMenuOpen(false)}
									>
										<span className={hero.actionIcon}>✉️</span>
										<span className={hero.actionText}>
											<span className={hero.actionTitle}>Open in Gmail</span>
											<span className={hero.actionDesc}>Compose in a new browser tab</span>
										</span>
										<span className={hero.actionArrow}>↗</span>
									</a>

									<a
										href={outlookUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={hero.modalActionItem}
										onClick={() => setMenuOpen(false)}
									>
										<span className={hero.actionIcon}>📨</span>
										<span className={hero.actionText}>
											<span className={hero.actionTitle}>Open in Outlook</span>
											<span className={hero.actionDesc}>Compose in Outlook webmail</span>
										</span>
										<span className={hero.actionArrow}>↗</span>
									</a>

									<a
										href={defaultMailUrl}
										className={hero.modalActionItem}
										onClick={() => {
											if (typeof navigator !== 'undefined' && navigator.clipboard) {
												navigator.clipboard.writeText(email).catch(() => {});
											}
											setMenuOpen(false);
										}}
									>
										<span className={hero.actionIcon}>💻</span>
										<span className={hero.actionText}>
											<span className={hero.actionTitle}>Default Mail App</span>
											<span className={hero.actionDesc}>Apple Mail, Outlook, Thunderbird</span>
										</span>
										<span className={hero.actionArrow}>↗</span>
									</a>
								</div>
							</div>
						</div>
					)}
				</section>
			</Container>
			<HeroBg theme="bg-color-1" />
		</Section>
	)
}