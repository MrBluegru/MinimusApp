import { StyleSheet } from "react-native";
import {
	backgroundTodoTheme,
	borderDarkWhite,
	blackWhite,
	whiteBlack,
	defaultWhite
} from "./colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: "10%",
		backgroundColor: backgroundTodoTheme,
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		marginBottom: 15,
		marginTop: 10,
		color: blackWhite,
	},
	line: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 25,
		borderBottomColor: borderDarkWhite,
	},
	inputTitle: {
		fontSize: 20,
		fontWeight: "600",
		lineHeight: 24,
		color: blackWhite,
	},
	textInput: {
		borderBottomColor: borderDarkWhite,
		borderBottomWidth: 1,
		width: "65%",
		color: defaultWhite,
	},
	errorView: {
		alignItems: "center",
		marginLeft: "20%",
		marginTop: -10,
		height: 18,
	},
	error: {
		color: "red",
	},
	inputDescrip: {
		borderBottomColor: borderDarkWhite,
		borderBottomWidth: 1,
		width: "65%",
		color: defaultWhite,
	},
	inputContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		paddingBottom: 20,
		paddingTop: 10,
		alignItems: "center",
	},
	time: {
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 24,
		color: blackWhite,
	},
	button: {
		marginTop: 30,
		marginBottom: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: blackWhite,
		height: 46,
		borderRadius: 11,
		width: "40%",
	},
	btons: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	done: {
		color: whiteBlack,
		fontWeight: "bold",
		fontSize: 20,
	},
	descrip: {
		color: borderDarkWhite,
		fontSize: 12,
		maxWidth: "85%",
	},
	priorityText: {
		color: whiteBlack,
		fontWeight: "bold",
		fontSize: 14,
	},
	prioritybutton: {
		alignItems: "center",
		justifyContent: "center",
		height: 40,
		margin: 10,
		borderRadius: 2,
		padding: 6,
		backgroundColor: blackWhite,
	},
});
