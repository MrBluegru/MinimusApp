import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Switch,
	Alert,
	BackHandler,
	ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Appearance } from "react-native";
import { styles } from "../styles/addToDo";

const AddToDo = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const colorScheme = Appearance.getColorScheme();

	const listTodos = useSelector((state) => state.todos.todos);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("low");
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [withAlert, setWithAlert] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	const [errorActive, setErrorActive] = useState(false);

	useEffect(() => {
		const backAction = () => {
			Alert.alert("Wait", `Changes will not be saved`, [
				{
					text: "Cancel",
					onPress: () => null,
					style: "cancel",
				},
				{ text: "YES", onPress: () => navigation.navigate("Home") },
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		if (Platform.OS === "android") {
			setShow(true);
		}
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	const handlerPriority = (value) => {
		setPriority(value);
	};

	//? Validation /////////////////

	const validation = (name, date) => {
		const currentDate = new Date();
		let error = {
			name: null,
			time: null,
		};

		if (name.length < 4) {
			error.name = "Name of task required";
		}
		if (currentDate.getTime() === date.getTime()) {
			error.time = "The time/date cannot be equal to this moment";
		}
		if (date.getTime() < currentDate.getTime()) {
			error.time = "The time/date cannot be earlier to this moment";
		}
		return error;
	};

	const errors = validation(name, date);

	//? ///////////// /////////////////

	const addTodo = async () => {
		const regex = /[:]+[0-9]+[.]/g;
		const newTodo = {
			id: uuid.v4(),
			title: name,
			priority: priority,
			description: description,
			date: date.toISOString().replace(regex, ":00."),
			isCompleted: false,
		};
		if ((errors.name || errors.time) !== null) {
			Alert.alert(
				"Wait",
				`${errors.name === null ? "" : errors.name}\n${
					errors.time === null ? "" : errors.time
				}`
			);
		} else {
			try {
				await AsyncStorage.setItem(
					"@Todos",
					JSON.stringify([...listTodos, newTodo])
				);
				dispatch(addTodoReducer(newTodo));
				withAlert ? await scheduleTodoNotification(newTodo) : null;
				navigation.goBack();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const scheduleTodoNotification = async (todo) => {
		const trigger = new Date(todo.date);
		try {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: `It's time to ${todo.title}`,
					body: todo.description,
				},
				trigger,
			});
		} catch (error) {
			alert(
				"The notification falied to schedule, make sure the hour is valid"
			);
		}
	};

	const handlerGoBack = () => {
		Alert.alert("Wait", `Changes will not be saved`, [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "YES",
				onPress: () => {
					navigation.navigate("Home");
				},
			},
		]);
	};
	const errorNFocus = () => {
		if (errorActive === true) {
			setErrorActive(false);
		} else {
			setErrorActive(true);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add Todo</Text>
			<View style={styles.line}></View>
			<ScrollView>
				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Name</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Task title"
						placeholderTextColor={colorScheme === "light" ? null : "grey"}
						onChangeText={(text) => {
							setName(text);
						}}
						onFocus={errorNFocus}
					/>
				</View>
				<View style={styles.errorView}>
					<Text style={styles.error}>
						{errorActive ? errors.name : ""}
					</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Description</Text>
					<TextInput
						multiline={true}
						numberOfLines={5}
						style={styles.inputDescrip}
						placeholder="task description..."
						placeholderTextColor={colorScheme === "light" ? null : "grey"}
						onChangeText={(text) => {
							setDescription(text);
						}}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Hour</Text>
					<Text style={styles.time}>
						{date.toLocaleTimeString().slice(0, -3)}
					</Text>
					{show && (
						<DateTimePicker
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={onChange}
						/>
					)}

					<TouchableOpacity
						onPress={showTimepicker}
						style={styles.prioritybutton}
					>
						<Text style={styles.priorityText}>SELECT HOUR</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Date</Text>
					<Text style={styles.time}>{date.toDateString()}</Text>

					<TouchableOpacity
						onPress={showDatepicker}
						style={styles.prioritybutton}
					>
						<Text style={styles.priorityText}>SELECT DATE</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.errorView}>
					<Text style={styles.error}>
						{errorActive ? errors.time : ""}
					</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.inputTitle}>Priority</Text>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<TouchableOpacity
							onPress={() => handlerPriority("low")}
							style={
								priority === "low"
									? [
											styles.prioritybutton,
											{
												backgroundColor: "#00a400",
												borderColor:
													colorScheme === "light" ? "#000" : "#fff",
												borderWidth: 2,
											},
									  ]
									: styles.prioritybutton
							}
						>
							<Text
								style={
									priority === "low"
										? [
												(styles.priorityText,
												{
													color: colorScheme === "light" ? "#000" : "#fff",
												}),
										  ]
										: [(styles.priorityText, { color: "#00a400" })]
								}
							>
								LOW
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => handlerPriority("regular")}
							style={
								priority === "regular"
									? [
											styles.prioritybutton,
											{
												backgroundColor: "#feb92a",
												borderColor:
													colorScheme === "light" ? "#000" : "#fff",
												borderWidth: 2,
											},
									  ]
									: styles.prioritybutton
							}
						>
							<Text
								style={
									priority === "regular"
										? [
												(styles.priorityText,
												{
													color: colorScheme === "light" ? "#000" : "#fff",
												}),
										  ]
										: [(styles.priorityText, { color: "#feb92a" })]
								}
							>
								REGULAR
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => handlerPriority("high")}
							style={
								priority === "high"
									? [
											styles.prioritybutton,
											{
												backgroundColor: "#cc0000",
												borderColor:
													colorScheme === "light" ? "#000" : "#fff",
												borderWidth: 2,
											},
									  ]
									: styles.prioritybutton
							}
						>
							<Text
								style={
									priority === "high"
										? [
												(styles.priorityText,
												{
													color: colorScheme === "light" ? "#000" : "#fff",
												}),
										  ]
										: [(styles.priorityText, { color: "#cc0000" })]
								}
							>
								HIGH
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<View>
						<Text style={styles.inputTitle}>Alert</Text>
						<Text style={styles.descrip}>
							You will receive an alert at the time you set for this
							reminder
						</Text>
					</View>
					<Switch
						value={withAlert}
						onValueChange={(value) => {
							setWithAlert(value);
						}}
						trackColor={{ false: "#767577", true: "#3ccc15" }}
						thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
					/>
				</View>
				<View style={styles.btons}>
					<TouchableOpacity onPress={handlerGoBack} style={styles.button}>
						<Text style={[styles.done, { color: "red" }]}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={addTodo} style={styles.button}>
						<Text style={styles.done}>Done</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

export default AddToDo;
