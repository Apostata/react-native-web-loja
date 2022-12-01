import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Platform, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const webWidth = windowWidth * 0.4;
const tabletWidth = windowWidth * 0.6;
const mobileWidth = windowWidth * 0.8;

const getContentWidth = () => {
	if (windowWidth <= 698) {
		return mobileWidth;
	} else if (windowWidth <= 992) {
		return tabletWidth;
	} else {
		return webWidth;
	}
};

const styles = StyleSheet.create({
	content: {
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 999,
		width: getContentWidth(),
		height: '100%',
		borderRadius: 0,
		backgroundColor: 'white',
	},
});

const Content = (props: {children: Element; isVisible: boolean}) => {
	const {isVisible, children} = props;
	const traslateX = useRef(new Animated.Value(-getContentWidth())).current;
	const [display, setDisplay] = useState<'none' | 'flex'>(
		isVisible ? 'flex' : 'none',
	);
	useEffect(() => {
		Animated.timing(traslateX, {
			toValue: isVisible ? 0 : -getContentWidth(),
			duration: 200,
			useNativeDriver: Platform.OS === 'web' ? false : true,
		}).start();
	}, [traslateX, isVisible]);

	useEffect(() => {
		const id = traslateX.addListener(state => {
			if (state.value === -traslateX) {
				setDisplay('none');
			} else {
				setDisplay('flex');
			}
		});

		return () => {
			traslateX.removeListener(id);
		};
	}, [display, setDisplay, traslateX]);

	return (
		<Card
			style={[
				styles.content,
				{transform: [{translateX: traslateX}], display: display},
			]}>
			{children}
		</Card>
	);
};

export default Content;
