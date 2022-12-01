export interface IRoute {
	label: string;
	pageLabel: string;
	path: string;
	element: React.FC;
	show?: boolean;
	childs?: IRoute[];
	initialData?: any;
}
