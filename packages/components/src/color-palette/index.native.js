/**
 * External dependencies
 */
import {
	ScrollView,
	TouchableWithoutFeedback,
	View,
	Animated,
	Easing,
} from 'react-native';
import { map } from 'lodash';
/**
 * WordPress dependencies
 */
import { useState, useEffect, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withPreferredColorScheme } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import styles from './style.scss';
import ColorIndicator from '../color-indicator';

const ANIMATION_DURATION = 200;

function ColorPalette( {
	setColor,
	activeColor,
	defaultSettings,
	currentSegment,
	onCustomPress,
	getStylesFromColorScheme,
	shouldEnableBottomSheetScroll,
} ) {
	const customSwatchGradients = [
		'linear-gradient(120deg, rgba(255,0,0,.8), 0%, rgba(255,255,255,1) 70.71%)',
		'linear-gradient(240deg, rgba(0,255,0,.8), 0%, rgba(0,255,0,0) 70.71%)',
		'linear-gradient(360deg, rgba(0,0,255,.8), 0%, rgba(0,0,255,0) 70.71%)',
	];

	const extendedDefaultColors = [
		{
			name: __( 'White' ),
			slug: 'white',
			color: '#ffffff',
		},
		{
			name: __( 'Black' ),
			slug: 'black',
			color: '#000000',
		},
		...defaultSettings.colors,
	];

	const scrollViewRef = createRef();

	const isGradientSegment = currentSegment === 'Gradient';
	const isGradient = activeColor?.includes( 'linear-gradient' );

	const [ scale ] = useState( new Animated.Value( 1 ) );
	const [ opacity ] = useState( new Animated.Value( 1 ) );

	const defaultColors = map( extendedDefaultColors, 'color' );
	const defaultGradientColors = map( defaultSettings.gradients, 'gradient' );

	useEffect( () => {
		scrollViewRef.current.scrollTo( { x: 0, y: 0 } );
	}, [ currentSegment ] );

	function isSelectedCustom() {
		const colors = isGradientSegment
			? defaultGradientColors
			: defaultColors;
		return ! isGradient && activeColor && ! colors.includes( activeColor );
	}

	function isSelected( color ) {
		return ! isSelectedCustom() && activeColor && activeColor === color;
	}

	function timingAnimation( property, toValue ) {
		return Animated.timing( property, {
			toValue,
			duration: ANIMATION_DURATION,
			easing: Easing.ease,
		} );
	}

	function performAnimation( color ) {
		opacity.setValue( isSelected( color ) ? 1 : 0 );
		scale.setValue( 1 );

		Animated.parallel( [
			timingAnimation( scale, 2 ),
			timingAnimation( opacity, 1 ),
		] ).start();
	}

	const scaleInterpolation = scale.interpolate( {
		inputRange: [ 1, 1.5, 2 ],
		outputRange: [ 1, 0.7, 1 ],
	} );

	function onColorPress( color ) {
		performAnimation( color );
		setColor( color );
	}

	function Palette( { isGradientPalette, withCustomPicker } ) {
		const palette = isGradientPalette
			? defaultGradientColors
			: defaultColors;
		const verticalSeparatorStyle = getStylesFromColorScheme(
			styles.verticalSeparator,
			styles.verticalSeparatorDark
		);

		return (
			<>
				{ palette.map( ( color ) => {
					const scaleValue = isSelected( color )
						? scaleInterpolation
						: 1;
					return (
						<TouchableWithoutFeedback
							onPress={ () => onColorPress( color ) }
							key={ color }
						>
							<Animated.View
								style={ {
									transform: [
										{
											scale: scaleValue,
										},
									],
								} }
							>
								<ColorIndicator
									color={ color }
									isSelected={ isSelected( color ) }
									opacity={ opacity }
									style={ styles.colorIndicator }
								/>
							</Animated.View>
						</TouchableWithoutFeedback>
					);
				} ) }
				{ withCustomPicker && (
					<>
						<View style={ verticalSeparatorStyle } />
						<TouchableWithoutFeedback onPress={ onCustomPress }>
							<View>
								<ColorIndicator
									withCustomPicker
									color={ customSwatchGradients }
									isSelected={ isSelectedCustom() }
									style={ styles.colorIndicator }
								/>
							</View>
						</TouchableWithoutFeedback>
					</>
				) }
			</>
		);
	}

	return (
		<ScrollView
			contentContainerStyle={ styles.contentContainer }
			style={ styles.container }
			horizontal
			showsHorizontalScrollIndicator={ false }
			keyboardShouldPersistTaps="always"
			disableScrollViewPanResponder
			onScrollBeginDrag={ () => shouldEnableBottomSheetScroll( false ) }
			onScrollEndDrag={ () => shouldEnableBottomSheetScroll( true ) }
			ref={ scrollViewRef }
		>
			<TouchableWithoutFeedback>
				<Palette
					withCustomPicker={ ! isGradientSegment }
					onCustomPress={ onCustomPress }
					isGradientPalette={ isGradientSegment }
				/>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
}

export default withPreferredColorScheme( ColorPalette );
