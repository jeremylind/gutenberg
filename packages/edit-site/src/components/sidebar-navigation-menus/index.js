/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NavigationInspector from '../navigation-inspector';
import SidebarNavigationTitle from '../sidebar-navigation-title';

export default function SidebarNavigationMenus() {
	return (
		<VStack spacing={ 6 }>
			<SidebarNavigationTitle
				parentTitle={ __( 'Design' ) }
				title={ __( 'Navigation' ) }
			/>
			<NavigationInspector />
		</VStack>
	);
}
