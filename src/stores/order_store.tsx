import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import {ICartItem} from '../Models/cart_model';
import {IOrder} from '../Models/order_model';
import {v4 as uuidv4} from 'uuid';

interface IOrderProviderValue {
	orders: IOrder[];
	setOrders: Dispatch<SetStateAction<IOrder[]>>;
	addOrder: (cart: ICartItem[], callback?: () => any) => void;
}

const OrderContext = createContext<IOrderProviderValue | null>(null);

export const useOrderContext = () => {
	const context = useContext(OrderContext);
	if (!context) {
		throw new Error('Must be used within an OrderContextProvider!');
	}
	return context;
};

interface IOrderProvider {
	children: ReactNode;
}

export const OrderProvider = (props: IOrderProvider) => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const {children} = props;

	const addOrder = useCallback(
		(cart: ICartItem[], callback?: () => any) => {
			const newOders = [...orders];
			const date = new Date();
			const newId = uuidv4();
			newOders.push({id: newId, cart, date});

			setOrders(newOders);
			callback?.();
		},
		[orders, setOrders],
	);

	const value = useMemo(
		() => ({
			orders,
			setOrders,
			addOrder,
		}),
		[orders, setOrders, addOrder],
	);

	return (
		<OrderContext.Provider value={value}>{children}</OrderContext.Provider>
	);
};
