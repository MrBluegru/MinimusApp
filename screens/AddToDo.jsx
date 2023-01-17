import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  Button,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/toDosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

const AddToDo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const listTodos = useSelector((state) => state.todos.todos);

  const [name, setName] = useState("");
  const [isToday, setIsToday] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [withAlert, setWithAlert] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    if (Platform.OS === "android") {
      setShow(true);
    }
  };

  const addTodo = async () => {
    const newTodo = {
      id: uuid.v4(),
      text: name,
      hour: isToday
        ? date.toISOString()
        : new Date(date).getDate() + 24 * 60 * 60 * 1000, // add one day at hour(if isToday is false)
      isToday: isToday,
      isCompleted: false,
    };
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodoReducer(newTodo));
      console.log(newTodo);
      withAlert ? await scheduleTodoNotification(newTodo) : null;
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const scheduleTodoNotification = async (todo) => {
    const trigger = new Date(todo.hour);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `It's time!`,
          body: todo.text,
        },
        trigger,
      });
    } catch (error) {
      alert("The notification falied to schedule, make sure the hour is valid");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Task"
          onChangeText={(text) => {
            setName(text);
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
            mode="time"
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Button onPress={showMode} title="Select Hour" />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>Today</Text>
          <Text style={styles.descrip}>
            If you disable today, the task will be considered as tomorrow
          </Text>
        </View>
        <Switch
          value={isToday}
          onValueChange={(value) => {
            setIsToday(value);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputTitle}>Alert</Text>
          <Text style={styles.descrip}>
            You will receive an alert at the time you set for this reminder
          </Text>
        </View>
        <Switch
          value={withAlert}
          onValueChange={(value) => {
            setWithAlert(value);
          }}
        />
      </View>

      <TouchableOpacity onPress={addTodo} style={styles.button}>
        <Text style={styles.done}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
    alignItems: "center",
  },
  time: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
  done: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  descrip: {
    color: "#00000060",
    fontSize: 12,
    maxWidth: "85%",
  },
});

export default AddToDo;
