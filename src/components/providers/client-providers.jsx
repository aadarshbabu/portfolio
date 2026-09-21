'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import SetGridGap from '@/components/utils/set.grid.util';

export default function ClientProviders({ children }) {
	return (
		<LazyMotion features={domAnimation}>
			{children}
			<SetGridGap />
			<Analytics />
		</LazyMotion>
	);
}
