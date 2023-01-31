import { Appearance, StyleSheet } from "react-native";
const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: "10%",
		backgroundColor: colorScheme === "light" ? "#fff" : "#161526",
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		marginBottom: 15,
		marginTop: 10,
		color: colorScheme === "light" ? "black" : "#F7F8FA",
	},
	line: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 25,
		borderBottomColor: colorScheme === "light" ? "#161526" : "#fff",
	},
	inputTitle: {
		fontSize: 20,
		fontWeight: "600",
		lineHeight: 24,
		color: colorScheme === "light" ? "black" : "#fff",
	},
	textInput: {
		borderBottomColor: colorScheme === "light" ? "#00000030" : "#fff",
		borderBottomWidth: 1,
		width: "65%",
		color: colorScheme === "light" ? null : "#fff",
	},
	errorView: {
		alignItems: "center",
		marginLeft: '20%',
		marginTop: -10,
		height: 18
	},
	error : {
		color: 'red'
	},
	inputDescrip: {
		borderBottomColor: colorScheme === "light" ? "#00000030" : "#fff",
		borderBottomWidth: 1,
		width: "65%",
		color: colorScheme === "light" ? null : "#fff",
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
		color: colorScheme === "light" ? "black" : "#fff",
	},
	button: {
		marginTop: 30,
		marginBottom: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colorScheme === "light" ? "black" : "#fff",
		height: 46,
		borderRadius: 11,
		width: "40%",
	},
	btons: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	done: {
		color: colorScheme === "light" ? "#fff" : "black",
		fontWeight: "bold",
		fontSize: 20,
	},
	descrip: {
		color: colorScheme === "light" ? "#00000060" : "#fff",
		fontSize: 12,
		maxWidth: "85%",
	},
	priorityText: {
		color: colorScheme === "light" ? "#fff" : "#000",
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
		backgroundColor: colorScheme === "light" ? "black" : "#fff",
	},
});
