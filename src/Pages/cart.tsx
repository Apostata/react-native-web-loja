import React, {FC, Fragment, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {numberToBrasilianReais} from '../helpers/number_to_brasilian_reais';
import {UseCartContext} from '../stores/cart_store';
import CartItem from '../Components/cart_item';
import {Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreSnackBar from '../Components/store_snack_bar';
import {useOrderContext} from '../stores/order_store';
const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	card: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		backgroundColor: 'white',
		marginTop: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},

	cardTotal: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		backgroundColor: 'white',
		marginBottom: 10,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},

	cartItemTotal: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},

	total: {
		fontSize: 22,
		fontWeight: 'bold',
	},

	cartItem: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	image: {
		maxWidth: 100,
	},

	cartItemChild: {
		flex: 1,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	cartItemChildFlex2: {
		flex: 2,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	cartItemChildFlex3: {
		flex: 3,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	buttonOuterLayout: {
		marginTop: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: isWeb ? 'flex-end' : 'center',
	},
	buyButton: {
		backgroundColor: '#ff5722',
		borderRadius: 0,
	},
	buyButtonText: {
		paddingLeft: 15,
		paddingRight: 15,
		color: 'white',
	},

	emptyCart: {
		minHeight: 300,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const Cart: FC = () => {
	const {cartItems, setCartItems} = UseCartContext();
	const {addOrder} = useOrderContext();
	const [showSnackBar, setShowSnackBar] = useState(false);
	if (cartItems.length > 0) {
		return (
			<Fragment>
				<View style={styles.container}>
					<Card style={styles.card}>
						<View style={styles.cartItem}>
							<Text style={[styles.cartItemChild, styles.image]}>Imagem</Text>
							<Text style={styles.cartItemChildFlex3}>Produto</Text>
							<Text style={styles.cartItemChild}>Quantidade</Text>
							<Text style={styles.cartItemChildFlex2}>Valor</Text>
							<Text style={styles.cartItemChild} />
						</View>
					</Card>
					{cartItems.map(item => (
						<CartItem key={item.id} item={item} />
					))}
					<Card style={styles.cardTotal}>
						<View style={styles.cartItemTotal}>
							<Text style={styles.total}>
								Total:{' '}
								{numberToBrasilianReais(
									cartItems.reduce((acu, item) => {
										acu += item.product.price * item.qty;
										console.log(acu);
										return acu;
									}, 0),
								)}
							</Text>
						</View>
					</Card>
					<View style={styles.buttonOuterLayout}>
						<Button
							style={styles.buyButton}
							mode="elevated"
							onPress={() =>
								addOrder(cartItems, () => {
									setShowSnackBar(true);
									setCartItems([]);
								})
							}>
							<Icon name="shopping" size={20} color="white" />
							<Text style={styles.buyButtonText}>Confirmar Pedido</Text>
						</Button>
					</View>
				</View>
			</Fragment>
		);
	} else {
		return (
			<View style={styles.emptyCart}>
				<Text>Seu Carrinho está vazio</Text>
				<StoreSnackBar
					showSnackBar={showSnackBar}
					onDismis={() => setShowSnackBar(false)}
					content={style => (
						<Text style={style}>Seu pedido foi confirmado!</Text>
					)}
				/>
			</View>
		);
	}
};

export default Cart;
