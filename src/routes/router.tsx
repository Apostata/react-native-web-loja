import React, {Fragment, memo} from 'react';
import Layout from '../Components/layout';
import {IRoute} from '../Models/route_model';
import {Router, Navigate, Route, Routes} from '../router-platforms';
import {Routes as RoutesList} from './routes';

export const renderRoutes = (route: IRoute) => {
	const Component = route.element;

	return (
		<Fragment key={`${route.label}-${Math.random()}`}>
			<Route
				path={`${route.path}`}
				element={
					<Layout title={route.label}>
						<Component />
					</Layout>
				}
			/>
			{route?.childs &&
				route?.childs?.length > 0 &&
				route?.childs.map(child =>
					renderRoutes({...child, path: `${route.path}${child.path}`}),
				)}
		</Fragment>
	);
};

export const MainRouter = memo(() => {
	return (
		<Router>
			<Routes>
				{RoutesList.map(route => renderRoutes(route))}
				<Route path="/" element={<Navigate to="/home" />} />
			</Routes>
		</Router>
	);
});
