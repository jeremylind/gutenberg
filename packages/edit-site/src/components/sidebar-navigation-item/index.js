/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __experimentalItem as Item } from '@wordpress/components';

export default function SidebarNavigationItem( { className, ...props } ) {
	return (
		<Item
			className={ classnames(
				'edit-site-sidebar-navigation-item',
				className
			) }
			{ ...props }
		/>
	);
}
