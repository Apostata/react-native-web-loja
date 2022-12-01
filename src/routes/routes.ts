import {IRoute} from '../Models/route_model';
import Cart from '../Pages/cart';
import Home from '../Pages/home';
import Orders from '../Pages/orders';
import Product from '../Pages/product';
// import Teste from '../Pages/teste';

export const Routes: IRoute[] = [
	{
		label: 'Home',
		pageLabel: 'Home',
		path: '/home',
		element: Home,
	},
	{
		label: 'Produto',
		pageLabel: 'Detalhes do produto',
		path: '/product/:id',
		show: false,
		element: Product,
	},
	{
		label: 'Carrinho',
		pageLabel: 'Carrinho',
		path: '/cart',
		element: Cart,
	},
	{
		label: 'Pedidos',
		pageLabel: 'Pedidos',
		path: '/orders',
		element: Orders,
	},

	// {
	// 	label: 'Super Heroes',
	// 	pageLabel: 'List Super Heroes',
	// 	path: '/superHeroes',
	// 	element: SuperHeroes,
	// 	exact: true,
	// 	childs: [
	// 		{
	// 			label: 'Teste',
	// 			path: '/teste',
	// 			element: Teste,
	// 			exact: true,
	// 		},
	// 		{
	// 			label: 'Superhero Details',
	// 			path: '/:id',
	// 			element: SuperHeroDetails,
	// 			exact: true,
	// 			show: false,
	// 		},

	// 	],
	// },
	// {
	// 	label: 'Parallel',
	// 	pageLabel: 'Parallel',
	// 	path: '/parallel',
	// 	initialData: {
	// 		heroIds: [1, 2, 3]
	// 	},
	// 	element: ParallelQuerys,
	// 	exact: true
	// },
	// {
	// 	label: 'Dependant Queries',
	// 	pageLabel: 'Dependat Queries',
	// 	path: '/dependant',
	// 	initialData: {
	// 		email: "rene@example.com"
	// 	},
	// 	element: DependantQueries,
	// 	exact: true
	// },
	// {
	// 	label: 'Query pagination',
	// 	pageLabel: 'Query pagination',
	// 	path: '/pagination',
	// 	element: Pagination,
	// 	exact: true
	// },
	// {
	// 	label: 'Infinite pagination',
	// 	pageLabel: 'Infinite pagination',
	// 	path: '/infinitePagination',
	// 	element: InfinitePagination,
	// 	exact: true
	// },
];
