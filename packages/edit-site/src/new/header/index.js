/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import {
	__unstableAnimatePresence as AnimatePresence,
	__experimentalHStack as HStack,
	__unstableMotion as motion,
	Button,
	FlexBlock,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useReducedMotion } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import EditorToolbars from '../../components/header';
import SiteIconAndTitle from '../site-icon-and-title';

export default function Header() {
	const { canvasMode } = useSelect(
		( select ) => ( {
			canvasMode: select( editSiteStore ).__unstableGetCanvasMode(),
		} ),
		[]
	);
	const { __unstableSetCanvasMode } = useDispatch( editSiteStore );
	const disableMotion = useReducedMotion();

	return (
		<HStack>
			<Button
				className="edit-site-new-header__toggle"
				label={ __( 'Toggle Navigation Sidebar' ) }
				onClick={ () =>
					__unstableSetCanvasMode(
						canvasMode === 'view' ? 'edit' : 'view'
					)
				}
			>
				{ canvasMode === 'edit' && (
					<SiteIconAndTitle showTitle={ false } />
				) }
				{ canvasMode === 'view' && __( 'Edit' ) }
			</Button>
			<FlexBlock>
				<AnimatePresence exitBeforeEnter>
					{ canvasMode === 'edit' && (
						<motion.div
							initial={ { opacity: 0 } }
							animate={ { opacity: 1 } }
							exit={ {
								opacity: 0,
							} }
							transition={ {
								type: 'tween',
								duration: disableMotion ? 0 : 0.5,
							} }
						>
							<EditorToolbars />
						</motion.div>
					) }
				</AnimatePresence>
			</FlexBlock>
		</HStack>
	);
}
