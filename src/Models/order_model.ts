import {ICartItem} from './cart_model';

export interface IOrder {
	id: string;
	cart: ICartItem[];
	date: Date;
}
