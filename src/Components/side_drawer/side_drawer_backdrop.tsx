import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Animated, Platform, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
	clickableBackDrop: {
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 999,
		width: '100%',
		height: '100%',
	},
	backdrop: {
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 999,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0, 0.4)',
	},
});

interface Props {
	isVisible: boolean;
	hide: Dispatch<React.SetStateAction<boolean>>;
	children?: JSX.Element;
}

function BackDrop(props: Props) {
	const {isVisible, hide} = props;
	const [display, setDisplay] = useState<'none' | 'flex'>(
		isVisible ? 'flex' : 'none',
	);
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: isVisible ? 1 : 0,
			duration: 300,
			useNativeDriver: Platform.OS === 'web' ? false : true,
		}).start();
	}, [opacity, isVisible]);

	useEffect(() => {
		const id = opacity.addListener(state => {
			if (state.value === 0) {
				setDisplay('none');
			} else {
				setDisplay('flex');
			}
		});

		return () => {
			opacity.removeListener(id);
		};
	}, [display, setDisplay, opacity]);

	const {children} = props;
	return (
		<Animated.View
			style={[styles.backdrop, {opacity: opacity, display: display}]}>
			<TouchableOpacity
				style={styles.clickableBackDrop}
				onPress={() => hide(!isVisible)}>
				{children}
			</TouchableOpacity>
		</Animated.View>
	);
}

export default BackDrop;
