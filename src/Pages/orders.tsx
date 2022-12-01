import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {dateToBrasilianDateAndTime} from '../helpers/date_to_brasilian_date_and_time';
import {numberToBrasilianReais} from '../helpers/number_to_brasilian_reais';
import {useOrderContext} from '../stores/order_store';

const styles = StyleSheet.create({
	orders: {
		padding: 15,
	},
	emptyOrders: {
		minHeight: 300,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		backgroundColor: 'white',
		marginTop: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		marginVertical: 15,
	},
	bold: {
		fontWeight: 'bold',
	},

	produtos: {
		padding: 15,
	},
	marginBottom10: {
		marginBottom: 10,
	},

	total: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 15,
	},
});

const Orders: FC = () => {
	const {orders} = useOrderContext();

	if (orders.length > 0) {
		let total = 0;

		return (
			<View style={styles.orders}>
				{orders.reverse().map(order => (
					<Card style={styles.card} key={`order=${order.id}`}>
						<View>
							<Text style={styles.marginBottom10}>
								ID: <Text style={styles.bold}>{order.id}</Text>
							</Text>
							<Text style={styles.marginBottom10}>
								Data da compra:{' '}
								<Text style={styles.bold}>
									{dateToBrasilianDateAndTime(order.date)}
								</Text>
							</Text>
						</View>
						<Divider bold />
						<Text>Produtos:</Text>
						<View style={styles.produtos}>
							{order.cart.map(item => {
								total += item.product.price;
								return (
									<View
										key={`product-${item.id}`}
										style={styles.marginBottom10}>
										<Text style={styles.bold}>
											{item.product.title} X {item.qty} ={' '}
											{numberToBrasilianReais(item.product.price)}
										</Text>
									</View>
								);
							})}
						</View>
						<Divider bold />
						<View style={styles.total}>
							<Text style={styles.bold}>
								Total: <Text>{numberToBrasilianReais(total)}</Text>
							</Text>
						</View>
					</Card>
				))}
			</View>
		);
	} else {
		return (
			<View style={styles.emptyOrders}>
				<Text>Você ainda não fez nenhum pedido!</Text>
			</View>
		);
	}
};

export default Orders;
