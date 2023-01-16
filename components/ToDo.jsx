import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "./Checkbox";

const ToDo = ({ id, text, isCompleted, isToday, hour }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        id={id}
        text={text}
        isCompleted={isCompleted}
        isToday={isToday}
        hour={hour}
      />
      <View>
        <Text
          style={
            isCompleted
              ? [styles.text, { textDecorationLine: "line-through" }]
              : styles.text
          }
        >
          {text}
        </Text>
        <Text
          style={
            isCompleted
              ? [styles.time, { textDecorationLine: "line-through" }]
              : styles.time
          }
        >
          {(hour)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
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
});

export default ToDo;
