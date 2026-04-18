import { useState, useEffect } from "react"

import Recent from '../../components/sections/articles/recent'
import Color from '../../components/utils/page.colors.util'
import colors from '../../content/articles/_colors.json'

//
export default function Articles({ wpPosts }) {
	return (
		<>
			<Color colors={colors} />
			<Recent wpPosts={wpPosts} />
		</>
	)
}

// This gets called on every request
export async function getServerSideProps({ res }) {

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=600, stale-while-revalidate=59'
	)

	const wpAPIURL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://public-api.wordpress.com/wp/v2/sites/itrate.wordpress.com/posts';

	const [wpAPI] = await Promise.all([
		fetch(`${wpAPIURL}?_embed`),
	])

	let wpPosts = await wpAPI.json()

	return { props: { wpPosts } }
}