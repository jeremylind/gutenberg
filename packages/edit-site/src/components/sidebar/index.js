/**
 * WordPress dependencies
 */
import {
	__experimentalVStack as VStack,
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import SiteIconAndTitle from '../site-icon-and-title';
import SidebarNavigationMenus from '../sidebar-navigation-menus';
import SidebarNavigationRoot from '../sidebar-navigation-root';

export function Sidebar() {
	return (
		<VStack alignment="top" spacing={ 10 }>
			<SiteIconAndTitle />
			<NavigatorProvider initialPath="/">
				<NavigatorScreen path="/">
					<SidebarNavigationRoot />
				</NavigatorScreen>
				<NavigatorScreen path="/navigation-menus">
					<SidebarNavigationMenus />
				</NavigatorScreen>
			</NavigatorProvider>
		</VStack>
	);
}
