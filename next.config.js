const path = require('path');

module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'src'), path.join(__dirname, 'src/styles')],
		silenceDeprecations: ['import'],
	},
	env: {
		dir: '/',
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.vercel.app',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '**.shields.io',
				pathname: '/badge/**'
			},
			{
				protocol: 'https',
				hostname: '**.shields.io',
				pathname: '/github/**'
			},
			{
				protocol: 'https',
				hostname: '**.githubusercontent.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '**.medium.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '**.wp.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '**.wordpress.com',
				pathname: '/**'
			},
		],
	},
}