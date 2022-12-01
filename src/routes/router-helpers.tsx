import React, {Fragment} from 'react';
import {Link} from '../router-platforms';
import {View, Text} from 'react-native';
import {IRoute} from '../Models/route_model';

export const RenderLink = (props: {
	children: Element;
	key?: string;
	path: string;
	params?: any;
}) => {
	const {params, path, children} = props;
	return <Link to={`${path}${params ? `?${params}` : '/'}`}>{children}</Link>;
};

export const renderLinks = (route: IRoute) => {
	let params: any = null;
	if (route?.initialData) {
		params = new URLSearchParams(route?.initialData).toString();
	}
	return (
		<Fragment key={`link-${route.path}-${Math.random()}`}>
			{route?.show !== false ? (
				<View>
					{/* {RenderLink(route, params)} */}
					<RenderLink path={route.path} params={params}>
						<Text>{route.label}</Text>
					</RenderLink>
					{route.childs &&
						route?.childs?.length > 0 &&
						route?.childs?.some(child => child.show !== false) && (
							<View>
								{route?.childs?.map(child =>
									renderLinks({
										...child,
										path: `${route.path}${child.path}${
											params ? `?${params}` : ''
										}`,
									}),
								)}
							</View>
						)}
				</View>
			) : null}
		</Fragment>
	);
};
