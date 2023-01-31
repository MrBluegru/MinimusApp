import { useEffect, useState } from "react";
import {
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
	BackHandler,
	Alert,
} from "react-native";
import ToDoList from "../components/ToDoList";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hideCompliteReducer, setTodosReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import moment from "moment";
import * as Device from "expo-device";
import { Appearance } from "react-native";
import { styles } from "../components/styles/home";


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function Home() {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const colorScheme = Appearance.getColorScheme();
	const todos = useSelector((state) => state.todos.todos);
	const [isHidden, setIsHidden] = useState(false);
	const highList = todos.filter((todo) => todo.priority === "high");
	const regularList = todos.filter((todo) => todo.priority === "regular");
	const lowList = todos.filter((todo) => todo.priority === "low");
	const [expoPushToken, setExpoPushToken] = useState("");

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);
		const getTodos = async () => {
			try {
				const todos = await AsyncStorage.getItem("@Todos");
				if (todos !== null) {
					dispatch(setTodosReducer(JSON.parse(todos)));
				}
			} catch (error) {
				console.log(error);
			}
		};
		getTodos();
	}, []);

	useEffect(() => {
		const backAction = () => {
			Alert.alert("Hold on!", "Do you want to exit the application?", [
				{
					text: "Cancel",
					onPress: () => null,
					style: "cancel",
				},
				{ text: "YES", onPress: () => BackHandler.exitApp() },
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	const handlerHidePress = async () => {
		if (isHidden) {
			setIsHidden(false);
			const todos = await AsyncStorage.getItem("@Todos");
			if (todos !== null) {
				dispatch(setTodosReducer(JSON.parse(todos)));
			}
		}
		if (!isHidden) {
			setIsHidden(true);
			dispatch(hideCompliteReducer());
		}
	};

	const registerForPushNotificationsAsync = async () => {
		let token;
		if (Device.isDevice) {
			const { status: exitingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = exitingStatus;
			if (exitingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
		} else {
			return;
		}
		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
		return token;
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text style={styles.title}>TODO LIST</Text>

				<TouchableOpacity onPress={handlerHidePress}>
					<Text style={{ color: "#3478f6" }}>
						{isHidden ? "Show Completed" : "Hide Complete"}
					</Text>
				</TouchableOpacity>
			</View>
			{todos.length ? (
				<>
					{highList.length ? (
						<>
							<View
								style={[styles.line, { borderBottomColor: "#9d0000" }]}
							></View>
							<ToDoList toDosData={highList} />
						</>
					) : null}

					{regularList.length ? (
						<>
							<View
								style={[styles.line, { borderBottomColor: "#e7e700" }]}
							></View>
							<ToDoList toDosData={regularList} />
						</>
					) : null}
					{lowList.length ? (
						<>
							<View
								style={[styles.line, { borderBottomColor: "#00a400" }]}
							></View>
							<ToDoList toDosData={lowList} />
						</>
					) : null}
				</>
			) : (
				<View style={styles.noTasks}>
					<Image
						source={
							colorScheme === "light"
								? require("../img/img.jpg")
								: require("../img/imgW.jpg")
						}
						style={{ height: 150, width: 150 }}
					/>
					<Text style={styles.textNTask}>
						No tasks for now, to add one tap on +
					</Text>
				</View>
			)}

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("Add Task")}
			>
				<Text style={styles.plus}>+</Text>
			</TouchableOpacity>
		</View>
	);
}
