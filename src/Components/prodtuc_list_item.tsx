import React, {Fragment} from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import {IProduct} from '../Models/product_model';
import {IconButton} from 'react-native-paper';
import {useNavigate} from '../router-platforms';

const windowWidth = Dimensions.get('window').width;
const twoColumns = (windowWidth - 30) / 2 - 20;
// const threeColumns = (windowWidth - 30) / 3 - 20;
const fourColumns = (windowWidth - 30) / 4 - 20;

const getItemWidth = () => {
	if (windowWidth <= 992) {
		return twoColumns;
	} else {
		return fourColumns;
	}
};

const styles = StyleSheet.create({
	listItem: {
		margin: 10,
		minHeight: 300,
		borderRadius: 30,
		overflow: 'hidden',
		flexBasis: getItemWidth(),
	},
	listImage: {
		width: '100%',
		height: '100%',
		minHeight: 300,
		resizeMode: 'cover',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: -1,
		borderRadius: 30,
	},

	listTitleContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 9,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		width: '100%',
		height: 60,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: 15,
		paddingRight: 15,
		alignItems: 'center',
		minWidth: 50,
	},

	listTitleText: {
		flex: 2,
		color: 'white',
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
		margin: 5,
	},
	listTitleButtons: {
		flex: 1,
		maxWidth: 25,
		// maxHeight: 20,
	},
});

interface Props {
	item: IProduct;
	addProductToCart: (
		prod: IProduct,
		callback?: (() => any) | undefined,
	) => void;
}

const ProductItem = ({item, addProductToCart}: Props) => {
	const navigate = useNavigate();
	return (
		<TouchableHighlight
			onPress={() => navigate(`/product/${item.id}`)}
			style={styles.listItem}>
			<Fragment>
				<View style={styles.listTitleContainer}>
					{/* <IconButton
						style={styles.listTitleButtons}
						icon="cards-heart-outline"
						iconColor="#ff5722"
						size={24}
						onPress={() => {}}
					/> */}
					<Text numberOfLines={1} style={styles.listTitleText}>
						{item.title}
					</Text>
					<IconButton
						style={styles.listTitleButtons}
						icon="cart"
						iconColor="#ff5722"
						size={24}
						onPress={() => {
							addProductToCart(item);
						}}
					/>
				</View>
				<Image
					style={styles.listImage}
					source={{
						uri: item.imageUrl,
					}}
				/>
			</Fragment>
		</TouchableHighlight>
	);
};

export default ProductItem;
