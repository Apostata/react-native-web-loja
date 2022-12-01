import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {UseCartContext} from '../../stores/cart_store';
import {useNavigate} from '../../router-platforms';

const styles = StyleSheet.create({
	appBarHeader: {backgroundColor: 'purple'},
	appBarContent: {color: 'white'},

	cartQtd: {
		position: 'absolute',
		top: 7,
		right: 5,
		borderRadius: 15,
		backgroundColor: '#ff5722',
		minWidth: 20,
		minHeight: 10,
	},
	cartQtdText: {color: 'white', textAlign: 'center'},
});

interface Props {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const StoreAppBar = (props: Props) => {
	const navigate = useNavigate();
	const {showModal, setShowModal} = props;
	const {cartItems} = UseCartContext();
	return (
		<Appbar.Header style={styles.appBarHeader}>
			{/* <Appbar.BackAction onPress={() => {}} /> */}
			<Appbar.Action
				icon="menu"
				color="white"
				onPress={() => setShowModal(!showModal)}
			/>
			<Appbar.Content
				title={<Text style={styles.appBarContent}>Minha Loja</Text>}
			/>
			<View>
				<Appbar.Action
					icon="cart"
					color="white"
					onPress={() => navigate('/cart')}
				/>
				<View style={styles.cartQtd}>
					<Text style={styles.cartQtdText}>{cartItems.length}</Text>
				</View>
			</View>
		</Appbar.Header>
	);
};

export default StoreAppBar;
