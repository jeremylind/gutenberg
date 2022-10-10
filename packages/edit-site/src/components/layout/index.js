/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __unstableMotion as motion } from '@wordpress/components';
import { useReducedMotion } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { Sidebar } from '../sidebar';
import Canvas from '../canvas';
import ErrorBoundary from '../error-boundary';
import { store as editSiteStore } from '../../store';

export default function Layout() {
	const { canvasMode } = useSelect(
		( select ) => ( {
			canvasMode: select( editSiteStore ).__unstableGetCanvasMode(),
		} ),
		[]
	);
	const disableMotion = useReducedMotion();

	// Todo: Bring back the template list to the sidebar.

	return (
		<div
			className={ classnames( 'edit-site-layout', {
				'is-full-canvas': canvasMode === 'edit',
			} ) }
		>
			<div className="edit-site-layout__sidebar">
				<Sidebar />
			</div>
			<div className="edit-site-layout__canvas-container">
				<motion.div
					className="edit-site-layout__canvas"
					layout={ ! disableMotion }
				>
					<ErrorBoundary>
						<Canvas />
					</ErrorBoundary>
				</motion.div>
			</div>
		</div>
	);
}
