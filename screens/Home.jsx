import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ToDoList from "../components/ToDoList";
import Constants from "expo-constants";
import { toDoData } from "../data/toDos";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hideCompliteReducer, setTodosReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
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

  // const [localData, setLocalData] = useState(
  //   toDoData.sort((a, b) => {
  //     return a.isCompleted - b.isCompleted;
  //   })
  // );
  const [isHidden, setIsHidden] = useState(false);

  const handlerHidePress = () => {
    // if (isHidden) {
    //   setIsHidden(false);
    //   setLocalData(
    //     toDoData.sort((a, b) => {
    //       return a.isCompleted - b.isCompleted;
    //     })
    //   );
    // }
    // if (!isHidden) {
    //   setIsHidden(true);
    //   setLocalData(localData.filter((toDo) => !toDo.isCompleted));
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://fondosmil.com/fondo/80554.jpg" }}
        style={styles.pic}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handlerHidePress}>
          <Text style={{ color: "#3478f6" }}>
            {isHidden ? "Show Completed" : "Hide Complete"}
          </Text>
        </TouchableOpacity>
      </View>
      <ToDoList toDosData={todos.filter((toDo) => toDo.isToday)} />

      <Text style={styles.title}>Tomorrow</Text>
      <ToDoList toDosData={todos.filter((toDo) => !toDo.isToday)} />
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
    fontSize: 34,
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
