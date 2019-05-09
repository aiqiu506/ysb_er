
const hideIcon = function() {
	// #ifndef APP-PLUS
	var icon = plus.nativeObj.View.getViewById("icon");
	if (icon) {
		icon.hide();
	}
	// #endif

}
const showIcon = function() {
	// #ifdef APP-PLUS
	var icon = plus.nativeObj.View.getViewById("icon");
	if (icon) {
		icon.show();
	}
	// #endif

}
export default {
	hideIcon,
	showIcon
}
