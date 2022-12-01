import React, {FC, Fragment, useEffect, useState} from 'react';
import {
	Dimensions,
	Image,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {numberToBrasilianReais} from '../helpers/number_to_brasilian_reais';
import {IProduct} from '../Models/product_model';
import {useParams} from '../router-platforms';
import {getProductById} from '../services/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UseCartContext} from '../stores/cart_store';
import StoreSnackBar from '../Components/store_snack_bar';

const windowWidth = Dimensions.get('window').width;
const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
	pageContainer: {
		padding: 15,
	},
	title: {
		color: 'black',
		fontSize: 25,
		textAlign: isWeb ? 'left' : 'center',
		marginBottom: 15,
	},

	subTitles: {
		fontSize: 18,
		fontWeight: 'bold',
		paddingTop: 15,
	},

	values: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		paddingBottom: 15,
		paddingTop: 15,
	},

	container: {
		display: 'flex',
		flexDirection: isWeb ? 'row' : 'column',
	},

	subContainer: {
		flex: 1,
		flexBasis: windowWidth / 2 - 30,
		minHeight: 300,
		padding: 15,
	},

	prodDetails: {
		backgroundColor: 'white',
		marginTop: isWeb ? 0 : 10,
	},

	image: {
		width: '100%',
		height: 'auto',
		minHeight: 300,
		resizeMode: 'contain',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: -1,
		borderRadius: 30,
	},
	buttonOuterLayout: {
		marginTop: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: isWeb ? 'flex-start' : 'center',
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
});

const Product: FC = () => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const {addProductToCart, removeProductFromCart} = UseCartContext();
	const [showSnackBar, setShowSnackBar] = useState(false);
	const params = useParams();

	useEffect(() => {
		const {id} = params;
		const getProduct = async (Id: string) => {
			const prod = await getProductById(Id);
			setProduct(prod);
		};
		if (id) {
			getProduct(id);
		}
	}, [params, setProduct]);

	console.log(product);
	return (
		<Fragment>
			<View style={styles.pageContainer}>
				<View>
					<Text style={styles.title}>{product?.title}</Text>
				</View>
				<View style={styles.container}>
					<View style={styles.subContainer}>
						<Image style={styles.image} source={{uri: product?.imageUrl}} />
					</View>
					<Card style={[styles.subContainer, styles.prodDetails]}>
						<Text style={styles.subTitles}>Descrição:</Text>
						<Text style={styles.values}>{product?.description}</Text>
						<Text style={styles.subTitles}>Preço:</Text>
						<Text style={styles.values}>
							{numberToBrasilianReais(
								product?.price ? (product?.price as number) : 0,
							)}
						</Text>
						<View style={styles.buttonOuterLayout}>
							<Button
								disabled={!product}
								style={styles.buyButton}
								mode="elevated"
								onPress={() =>
									addProductToCart(product as IProduct, () =>
										setShowSnackBar(true),
									)
								}>
								<Icon name="cart" size={20} color="white" />
								<Text style={styles.buyButtonText}>Compar</Text>
							</Button>
						</View>
					</Card>
				</View>
			</View>
			<StoreSnackBar
				showSnackBar={showSnackBar}
				onDismis={() => setShowSnackBar(false)}
				action={{
					label: 'Desfazer',
					onPress: () => {
						removeProductFromCart(product as IProduct);
					},
				}}
				content={style => (
					<Text style={style}>
						Produto {product?.title} adicionado ao carrinho!
					</Text>
				)}
			/>
		</Fragment>
	);
};

export default Product;
