import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Drawer} from 'react-native-paper';
import {IRoute} from '../Models/route_model';
// import {Drawer} from 'react-native-paper';
import {RenderLink} from '../routes/router-helpers';

const styles = StyleSheet.create({
	menuItem: {
		borderRadius: 20,
		padding: 15,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: 'transparent',
	},
	menuItemInactive: {
		backgroundColor: 'white',
	},
	menuItemActive: {
		backgroundColor: 'purple',
	},

	menuItemActiveText: {
		color: 'white',
		textDecorationLine: 'none',
		textDecorationColor: 'transparent',
	},
	menuItemInactiveText: {
		color: 'purple',
		textDecorationLine: 'none',
		textDecorationColor: 'transparent',
	},
});

interface Props {
	title: string;
	activeRoute: string;
	routes: IRoute[];
}

const MenuDrawer = (props: Props) => {
	const {title, activeRoute, routes} = props;
	return (
		<Drawer.Section title={title}>
			{routes
				.filter(theRoutes => theRoutes.show !== false)
				.map(route => {
					return (
						<RenderLink key={`manuItem-${route.label}`} path={route.path}>
							<View
								style={[
									styles.menuItem,
									activeRoute === route.path
										? styles.menuItemActive
										: styles.menuItemInactive,
								]}>
								<Text
									style={[
										activeRoute === route.path
											? styles.menuItemActiveText
											: styles.menuItemInactiveText,
									]}>
									{route.label}
								</Text>
							</View>
						</RenderLink>
					);
				})}
		</Drawer.Section>
	);
};
export default MenuDrawer;
