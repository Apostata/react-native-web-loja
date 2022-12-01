import React, {Fragment, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {IProduct} from '../Models/product_model';
import {getProducts} from '../services/products';
import ProductItem from '../Components/prodtuc_list_item';
import {UseCartContext} from '../stores/cart_store';
import StoreSnackBar from '../Components/store_snack_bar';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	loading: {flexDirection: 'column'},
	loadingText: {textAlign: 'center'},
	listContainer: {
		padding: 15,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: windowWidth,
	},
});

const Home: React.FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
	const [showSnackBar, setShowSnackBar] = useState(false);
	const {addProductToCart, removeProductFromCart} = UseCartContext();

	useEffect(() => {
		const fetchProducts = async (): Promise<void> => {
			if (products?.length < 1) {
				const result = await getProducts();
				setProducts(result);
			}
		};
		fetchProducts();
	}, [products]);

	if (products.length) {
		return (
			<Fragment>
				<View style={styles.listContainer}>
					{products.map(product => (
						<ProductItem
							key={`${product.id}-${Math.random()}`}
							item={product}
							addProductToCart={() => {
								addProductToCart(product, () => {
									setSelectedProduct(product);
									setShowSnackBar(true);
								});
							}}
						/>
					))}
				</View>

				<StoreSnackBar
					showSnackBar={showSnackBar}
					onDismis={() => setShowSnackBar(false)}
					action={{
						label: 'Desfazer',
						onPress: () => {
							removeProductFromCart(selectedProduct as IProduct);
						},
					}}
					content={style => (
						<Text style={style}>
							Produto {selectedProduct?.title} adicionado ao carrinho!
						</Text>
					)}
				/>
			</Fragment>
		);
	} else {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Loading...</Text>
			</View>
		);
	}
};

export default Home;
