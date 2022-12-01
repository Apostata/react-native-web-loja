import React, {
	useContext,
	createContext,
	useState,
	useMemo,
	Dispatch,
	SetStateAction,
	useCallback,
	ReactNode,
} from 'react';
import {ICartItem} from '../Models/cart_model';
import {IProduct} from '../Models/product_model';
import {v4 as uuidv4} from 'uuid';

interface CartProviderValue {
	cartItems: ICartItem[];
	setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
	addProductToCart: (prod: IProduct, callback?: () => any) => void;
	removeProductFromCart: (prod: IProduct, callback?: () => any) => void;
	excludeProductFromCart: (id: string) => void;
}

const CartContext = createContext<CartProviderValue | null>(null);

export const UseCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('Must be used within an CartContextProvider!');
	}
	return context;
};

interface ICartProvider {
	children: ReactNode;
}

export const CartProvider = (props: ICartProvider) => {
	const {children} = props;
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);

	const indexInCart = useCallback(
		(id: string) => {
			return cartItems.findIndex(
				(cartItem: ICartItem) => cartItem.product.id === id,
			);
		},
		[cartItems],
	);

	const addProductToCart = useCallback(
		(prod: IProduct, callback?: () => any) => {
			const newCart = [...cartItems];
			const isAlreadyInCart = indexInCart(prod.id);
			if (isAlreadyInCart !== -1) {
				newCart[isAlreadyInCart].qty += 1;
			} else {
				const newId = uuidv4();
				newCart.push({id: newId, product: prod, qty: 1});
			}
			setCartItems(newCart);
			callback?.();
		},
		[cartItems, setCartItems, indexInCart],
	);

	const removeProductFromCart = useCallback(
		(prod: IProduct, callback?: () => any) => {
			const newCart = [...cartItems];
			const isAlreadyInCart = indexInCart(prod.id);
			if (isAlreadyInCart !== -1 && newCart[isAlreadyInCart].qty > 1) {
				newCart[isAlreadyInCart].qty -= 1;
			} else {
				newCart.splice(isAlreadyInCart, 1);
			}
			setCartItems(newCart);
			callback?.();
		},
		[cartItems, setCartItems, indexInCart],
	);

	const excludeProductFromCart = useCallback(
		(id: string) => {
			const newCart = [...cartItems];
			const isAlreadyInCart = indexInCart(id);
			if (isAlreadyInCart !== -1) {
				newCart.splice(isAlreadyInCart, 1);
			}
		},
		[cartItems, indexInCart],
	);

	const value: CartProviderValue | null = useMemo(
		() => ({
			cartItems,
			setCartItems,
			addProductToCart,
			removeProductFromCart,
			excludeProductFromCart,
		}),
		[
			cartItems,
			setCartItems,
			addProductToCart,
			removeProductFromCart,
			excludeProductFromCart,
		],
	);
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
