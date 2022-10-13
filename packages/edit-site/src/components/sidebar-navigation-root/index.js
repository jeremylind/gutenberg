/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SidebarNavigationTitle from '../sidebar-navigation-title';
import { useLink } from '../routes/link';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useLocation } from '../routes';

export default function SidebarNavigationRoot() {
	const { params } = useLocation();
	const templatesLink = useLink( {
		postType: 'wp_template',
		postId: undefined,
	} );
	const templatePartsLink = useLink( {
		postType: 'wp_template_part',
		postId: undefined,
	} );

	return (
		<VStack spacing={ 6 }>
			<SidebarNavigationTitle
				parentTitle={ __( 'Dashboard' ) }
				title={ __( 'Design' ) }
				parentHref="index.php"
			/>
			<ItemGroup>
				<NavigatorButton
					path="/navigation-menus"
					as={ SidebarNavigationItem }
				>
					{ __( 'Navigation Menus' ) }
				</NavigatorButton>
				<SidebarNavigationItem
					{ ...templatesLink }
					aria-pressed={
						params.postType === 'wp_template' && ! params.postId
					}
				>
					{ __( 'Templates' ) }
				</SidebarNavigationItem>
				<SidebarNavigationItem
					{ ...templatePartsLink }
					aria-pressed={
						params.postType === 'wp_template_part' &&
						! params.postId
					}
				>
					{ __( 'Template Parts' ) }
				</SidebarNavigationItem>
			</ItemGroup>
		</VStack>
	);
}
