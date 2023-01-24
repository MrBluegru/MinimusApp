import React, { useState } from "react";
import {
	Modal,
	Pressable,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import Checkbox from "./Checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();

const ToDo = ({ id, title, isCompleted, description, date, priority }) => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos.todos);
	const [modalVisible, setModalVisible] = useState(false);
	const [localHour, setLocalHour] = useState(new Date(date));

	const handleDeleteTodo = () => {
		Alert.alert(
			"Delete task",
			`Are you sure to delete the task ${title}`,
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: async () => {
						dispatch(deleteTodoReducer(id));
						try {
							await AsyncStorage.setItem(
								"@Todos",
								JSON.stringify(todos.filter((todo) => todo.id !== id))
							);
						} catch (error) {
							console.log(error);
						}
					},
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							{title}
						</Text>
						<Text style={styles.modalText}>{description}</Text>
						<Text style={[styles.modalText, { fontStyle: "italic" }]}>
							Priority {priority}
						</Text>
						<Text style={[styles.modalText, { fontWeight: "bold" }]}>
							{localHour.toDateString()}, {moment(localHour).format("LT")}
						</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Checkbox id={id} isCompleted={isCompleted} />
				<View>
					<Text
						style={
							isCompleted
								? [styles.text, { textDecorationLine: "line-through" }]
								: styles.text
						}
					>
						{title}
					</Text>
					<Text
						style={
							isCompleted
								? [styles.time, { textDecorationLine: "line-through" }]
								: styles.time
						}
					>
						{moment(localHour).format("LT")}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Entypo
						name="eye"
						size={24}
						color={colorScheme === "light" ? "#73737340" : "#fff"}
						style={styles.icons}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={handleDeleteTodo}>
					<MaterialIcons
						name="delete-outline"
						size={24}
						color={colorScheme === "light" ? "#73737340" : "#fff"}
						style={styles.icons}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 15,
		fontWeight: "500",
		color: "#737373",
	},
	time: {
		fontSize: 13,
		color: "#a3a3a3",
		fontWeight: "500",
	},

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 4,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#454d60",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	icons: {
		fontSize: 24,
		paddingHorizontal: 8,
	},
});

export default ToDo;
