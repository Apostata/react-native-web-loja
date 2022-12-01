import {IProduct} from './../Models/product_model';
// import {IHttpResponse} from './../Models/httpResponse';
import products from '../data/dummy_data.json';

export const getProducts = async () => {
	return new Promise<IProduct[]>(resolve => {
		// Simula uma chamada para a api
		setTimeout(() => {
			resolve(products);
		}, 1000);
	});
};

export const getProductById = async (id: string) => {
	return new Promise<IProduct>(resolve => {
		// Simula uma chamada para a api
		setTimeout(() => {
			resolve(products.find(product => product.id === id) as IProduct);
		}, 1000);
	});
};
