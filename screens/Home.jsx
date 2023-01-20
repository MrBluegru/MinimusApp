import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ToDoList from "../components/ToDoList";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hideCompliteReducer, setTodosReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import moment from "moment";
import * as Device from "expo-device";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [isHidden, setIsHidden] = useState(false);
  // const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );
    // const getTodos = async () => {
    //   try {
    //     const todos = await AsyncStorage.getItem("@Todos");
    //     if (todos !== null) {
    //       dispatch(setTodosReducer(todos));
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getTodos();
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

  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: exitingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = exitingStatus;
  //     if (exitingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     return;
  //   }
  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF2331F7C",
  //     });
  //   }
  //   return token;
  // };

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
      <ToDoList toDosData={todos} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
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
    color: "#fff",
    position: "absolute",
    top: -8,
    left: 9,
  },
});
