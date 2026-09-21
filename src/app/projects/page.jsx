import GitRecentProjects from '@/components/sections/projects/recent';
import FeaturedProjects from '@/components/sections/projects/featured';
import Color from '@/components/utils/page.colors.util';
import settings from '@/content/_settings.json';
import colors from '@/content/projects/_colors.json';

export const metadata = {
	title: 'Projects | Aadarsh Singh',
	description:
		'Explore open source projects, featured repositories, and software contributions by Aadarsh Singh on GitHub.',
	openGraph: {
		title: 'Projects | Aadarsh Singh',
		description:
			'Explore open source projects, featured repositories, and software contributions by Aadarsh Singh on GitHub.',
	},
};

async function getProjectsData() {
	try {
		const [gitUserRes, gitReposRes] = await Promise.all([
			fetch(`https://api.github.com/users/${settings.username.github}`, {
				next: { revalidate: 600 },
			}),
			fetch(`https://api.github.com/users/${settings.username.github}/repos`, {
				next: { revalidate: 600 },
			}),
		]);

		let [user, repos] = await Promise.all([
			gitUserRes.json(),
			gitReposRes.json(),
		]);

		if (user && user.login) {
			user = [user].map(
				({ login, name, avatar_url, html_url }) => ({ login, name, avatar_url, html_url })
			);
		} else {
			user = [];
		}

		if (Array.isArray(repos) && repos.length) {
			repos = repos.map(
				({ name, fork, description, forks_count, html_url, language, watchers, default_branch, homepage, pushed_at, topics }) => {
					const timestamp = Math.floor(new Date(pushed_at) / 1000);
					return {
						name,
						fork,
						description,
						forks_count,
						html_url,
						language,
						watchers,
						default_branch,
						homepage,
						timestamp,
						topics: topics || [],
						pushed_at,
					};
				}
			);

			repos.sort((a, b) => b.timestamp - a.timestamp);

			repos = repos.filter((e, i) => {
				if (i < 20 && !e.topics.includes('github-config')) return true;
				return false;
			});
		} else {
			repos = [];
		}

		return { user, repos };
	} catch (error) {
		console.error('Error fetching GitHub project data:', error);
		return { user: [], repos: [] };
	}
}

export default async function ProjectsPage() {
	const { user, repos } = await getProjectsData();

	return (
		<>
			<Color colors={colors} />
			<FeaturedProjects />
			<GitRecentProjects user={user} repos={repos} />
		</>
	);
}
