/**
 * WordPress dependencies
 */
import {
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalHeading as Heading,
	__experimentalView as View,
	__experimentalNavigatorBackButton as NavigatorBackButton,
	__experimentalSpacer as Spacer,
	Button,
} from '@wordpress/components';
import { isRTL, __ } from '@wordpress/i18n';
import { chevronRight, chevronLeft } from '@wordpress/icons';

export default function SidebarNavigationTitle( {
	parentHref,
	parentTitle,
	title,
} ) {
	return (
		<VStack spacing={ 10 }>
			<View>
				<HStack spacing={ 2 }>
					{ ! parentHref && (
						<NavigatorBackButton
							style={
								// TODO: This style override is also used in ToolsPanelHeader.
								// It should be supported out-of-the-box by Button.
								{
									minWidth: 24,
									padding: 0,
									color: 'currentColor',
								}
							}
							icon={ isRTL() ? chevronRight : chevronLeft }
							isSmall
							aria-label={ __( 'Navigate to the previous view' ) }
						/>
					) }
					{ parentHref && (
						<Button
							style={
								// TODO: This style override is also used in ToolsPanelHeader.
								// It should be supported out-of-the-box by Button.
								{
									minWidth: 24,
									padding: 0,
									color: 'currentColor',
								}
							}
							icon={ isRTL() ? chevronRight : chevronLeft }
							href={ parentHref }
							isSmall
							aria-label={ __( 'Navigate to the previous view' ) }
						></Button>
					) }
					<Spacer>
						<Heading
							level={ 5 }
							style={ { color: 'currentColor' } }
						>
							{ parentTitle }
						</Heading>
					</Spacer>
				</HStack>
			</View>
			<Heading level={ 3 } style={ { color: 'currentColor' } }>
				{ title }
			</Heading>
		</VStack>
	);
}
