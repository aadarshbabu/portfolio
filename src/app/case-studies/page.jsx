import Color from '@/components/utils/page.colors.util';
import ComingSoon from '@/components/sections/comingsoon';
import colors from '@/content/case-studies/_colors.json';

export const metadata = {
	title: 'Case Studies | Aadarsh Singh',
	description: 'Detailed case studies and engineering deep-dives by Aadarsh Singh.',
};

export default function CaseStudiesPage() {
	return (
		<>
			<Color colors={colors} />
			<ComingSoon />
		</>
	);
}
