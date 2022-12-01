import React, {Fragment, useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Routes} from '../routes/routes';
import SideDrawer from './side_drawer/side_drawer';
import {useOld} from '../hook/use-old-hook';
import {useLocation} from '../router-platforms';
import MenuDrawer from './main-menu-drawer';
import StoreAppBar from './app_bar/app_bar';
// import MenuDrawer from './main-menu-drawer';

type TLayoutProps = {
	children: JSX.Element | null;
	title: string;
};

const styles = StyleSheet.create({
	scrollViewStyle: {
		flexGrow: 1,
	},

	ModalcontainerStyle: {backgroundColor: 'white', padding: 20, zIndex: 99},
	menuItem: {
		borderRadius: 20,
		padding: 15,
		marginLeft: 15,
		marginRight: 15,
		display: 'flex',
		width: 'fit-content',
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

const Layout: React.FC<TLayoutProps> = ({children, title}) => {
	const [showModal, setShowModal] = useState(false);
	const [active, setActive] = useState(`${Routes[0].path}`);

	const location = useLocation();

	const menuSetActiveAndCloseDrawer = useCallback(() => {
		setShowModal(false);
		const thePath = location.pathname.replace(/\/$/, '');
		if (active !== thePath) {
			setActive(thePath);
		}
	}, [active, location]);

	useOld(location, menuSetActiveAndCloseDrawer);

	return (
		<Fragment>
			<SafeAreaView>
				<StoreAppBar showModal={showModal} setShowModal={setShowModal} />
			</SafeAreaView>
			<ScrollView contentContainerStyle={styles.scrollViewStyle}>
				{children}
			</ScrollView>

			<SideDrawer.Backdrop isVisible={showModal} hide={setShowModal} />
			<SideDrawer.Content isVisible={showModal}>
				<MenuDrawer title="Menu" activeRoute={active} routes={Routes} />
			</SideDrawer.Content>
		</Fragment>
	);
};

export default Layout;
