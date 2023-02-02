import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();

const backgroundTodoTheme = colorScheme === "light" ? "#fff" : "#161526";
const borderDarkWhite = colorScheme === "light" ? "#00000030" : "#fff";
const blackWhite = colorScheme === "light" ? "#000" : "#fff";
const whiteBlack = colorScheme === "light" ? "#fff" : "#000";
const defaultWhite = colorScheme === "light" ? null : "#fff"
const whiteGrey = colorScheme === "light" ? null : "grey"

module.exports = {
	backgroundTodoTheme,
	borderDarkWhite,
	blackWhite,
	whiteBlack,
	defaultWhite,
	whiteGrey
};
