/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __unstableMotion as motion } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Sidebar } from '../sidebar';
import Canvas from '../canvas';
import { store as editSiteStore } from '../../store';
import ErrorBoundary from '../../components/error-boundary';

export default function Layout() {
	const { canvasMode } = useSelect(
		( select ) => ( {
			canvasMode: select( editSiteStore ).__unstableGetCanvasMode(),
		} ),
		[]
	);

	// Todo: Bring back the template list to the sidebar.

	return (
		<div
			className={ classnames( 'edit-site-new__layout', {
				'is-full-canvas': canvasMode === 'edit',
			} ) }
		>
			<div className="edit-site-new__sidebar">
				<Sidebar />
			</div>
			<div className="edit-site-new__canvas-container">
				{ /* todo: support reduced motion */ }
				<motion.div className="edit-site-new__canvas" layout>
					<ErrorBoundary>
						<Canvas />
					</ErrorBoundary>
				</motion.div>
			</div>
		</div>
	);
}
