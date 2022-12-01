import React from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	useColorScheme,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import 'react-native-get-random-values';
import 'number-to-locale-string-polyfill';

import {MainRouter} from './routes/router';
import {CartProvider} from './stores/cart_store';
import {OrderProvider} from './stores/order_store';

const styles = StyleSheet.create({
	scrollView: {
		width: '100%',
		flex: 1,
	},
});

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<PaperProvider>
			<CartProvider>
				<OrderProvider>
					<SafeAreaView style={styles.scrollView}>
						<StatusBar
							barStyle={isDarkMode ? 'light-content' : 'dark-content'}
						/>
						<MainRouter />
					</SafeAreaView>
				</OrderProvider>
			</CartProvider>
		</PaperProvider>
	);
};

export default App;
