import { Appearance, StyleSheet } from "react-native";
import Constants from "expo-constants";
const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		paddingHorizontal: 15,
		backgroundColor: colorScheme === "light" ? "#fff" : "#161526",
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 35,
		marginTop: 10,
		color: colorScheme === "light" ? "black" : "#fff",
	},
	button: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: colorScheme === "light" ? "black" : "#fff",
		position: "absolute",
		bottom: 30,
		right: 25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	plus: {
		fontSize: 40,
		color: colorScheme === "light" ? "#fff" : "#000",
		position: "absolute",
		top: -8,
		left: 9,
	},
	line: {
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 10,
	},
	noTasks: {
		alignItems: "center",
		justifyContent: "center",
		padding: 30,
		borderRadius: 8,
		height: "80%",
	},
	textNTask: {
		fontSize: 16,
		fontStyle: "italic",
		color: colorScheme === "light" ? "black" : "#fff",
	},
});
