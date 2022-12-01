import Ionicons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

const IoniconsStyles = `@font-face {
  src: url(${Ionicons});
  font-family: MaterialCommunityIcons;
}`;

const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
	style.styleSheet.cssText = IoniconsStyles;
} else {
	style.appendChild(document.createTextNode(IoniconsStyles));
}
document.head.appendChild(style);
