import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
const styles = StyleSheet.create({
	snackbar: {
		backgroundColor: 'rgba(0,0,0, 0.8)',
	},
	textStyle: {
		color: 'white',
	},
});

interface Props {
	showSnackBar: boolean;
	onDismis: () => void;
	action?: {
		label: string;
		onPress: () => void;
	};
	content: (style?: any) => JSX.Element;
}

const StoreSnackBar: FC<Props> = ({
	showSnackBar,
	action,
	onDismis,
	content,
}: Props) => {
	return (
		<Snackbar
			style={styles.snackbar}
			visible={showSnackBar}
			onDismiss={onDismis}
			action={action}>
			{content(styles.textStyle)}
		</Snackbar>
	);
};

export default StoreSnackBar;
