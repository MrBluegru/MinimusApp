import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { updateTodoReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

const Checkbox = ({ id, isCompleted }) => {
  const dispatch = useDispatch();
  const listTodos = useSelector((state) => state.todos.todos);

  const handleCheckbox = () => {
    try {
      dispatch(updateTodoReducer({ id, isCompleted }));
      AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(
          listTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleCheckbox}
      style={isCompleted ? styles.checked : styles.unChecked}
    >
      {isCompleted && <Entypo name="check" size={16} color="#FAFAFA" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Checkbox;
