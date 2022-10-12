/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalItem as Item,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SidebarNavigationTitle from '../sidebar-navigation-title';
import { useLink } from '../routes/link';

export default function SidebarNavigationRoot() {
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
				<NavigatorButton path="/navigation-menus" as={ Item }>
					{ __( 'Navigation Menus' ) }
				</NavigatorButton>
				<Item { ...templatesLink }>{ __( 'Templates' ) }</Item>
				<Item { ...templatePartsLink }>{ __( 'Template Parts' ) }</Item>
			</ItemGroup>
		</VStack>
	);
}
