import React, {Fragment} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import {renderLinks} from '../routes/router';
// import {Routes} from '../routes/routes';

const styles = StyleSheet.create({
	scrollView: {
		width: '100%',
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#282c34',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 300,
		height: 300,
	},
	title: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	text: {
		color: '#fff',
	},
});

const Teste: React.FC = () => {
	return (
		<Fragment>
			{/* {Routes.map(route => renderLinks(route))} */}
			<View style={styles.container}>
				<Text style={styles.text}>Teste</Text>
			</View>
		</Fragment>
	);
};

export default Teste;
