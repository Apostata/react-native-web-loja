import {IProduct} from './product_model';

export interface ICartItem {
	id: string;
	product: IProduct;
	qty: number;
}
