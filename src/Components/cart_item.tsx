import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {numberToBrasilianReais} from '../helpers/number_to_brasilian_reais';
import {ICartItem} from '../Models/cart_model';
import {UseCartContext} from '../stores/cart_store';

const styles = StyleSheet.create({
	card: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		backgroundColor: 'white',
		// marginVertical: 10,
		borderRadius: 0,
	},

	cartItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	cartItemChild: {
		flex: 1,
		textAlign: 'center',
		minWidth: 50,
	},

	cartItemChildFlex2: {
		flex: 2,
		textAlign: 'center',
		minWidth: 75,
	},

	cartItemChildFlex3: {
		flex: 3,
		textAlign: 'center',
		minWidth: 100,
	},

	imageContainer: {
		maxWidth: 100,
	},

	image: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
});

interface Props {
	item: ICartItem;
}

const CartItem = ({item}: Props) => {
	const {excludeProductFromCart} = UseCartContext();
	return (
		<Card key={item.id} style={styles.card}>
			<View style={styles.cartItem}>
				<View style={[styles.cartItemChild, styles.imageContainer]}>
					<Image style={styles.image} source={{uri: item.product.imageUrl}} />
				</View>

				<Text style={styles.cartItemChildFlex3}>{item.product.title}</Text>
				<Text style={styles.cartItemChild}>{item.qty}</Text>
				<Text style={styles.cartItemChildFlex2}>
					{numberToBrasilianReais(item.product.price * item.qty)}
				</Text>
				<IconButton
					style={styles.cartItemChild}
					icon="delete"
					iconColor="red"
					onPress={() => excludeProductFromCart(item.id)}
				/>
			</View>
		</Card>
	);
};

export default CartItem;
