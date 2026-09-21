'use client'

// Core packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fat } from '@fortawesome/pro-thin-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Prevent FontAwesome from automatically injecting dynamic CSS into the DOM (causes hydration mismatch)
config.autoAddCss = false

// Load icons into library
library.add(fat, fal, fas, fad, far, fab)

/**
 * Icon factory utility.
 * Generates icon JSX directly matching SSR and CSR output.
 *
 * @param 	{array} icon request props [ iconType, iconKey ]
 * @returns {jsx} 	<Icon />
 */
export default function Icon({ icon, className = '', ...rest }) {
	if (!icon || !Array.isArray(icon) || icon.length < 2) return null;

	const [ iconType, iconKey ] = icon;
	if (!iconType || !iconKey) return null;

	return (
		<FontAwesomeIcon icon={[ iconType, iconKey ]} className={className || ''} {...rest} />
	);
}
