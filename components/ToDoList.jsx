import * as React from "react";
import { View, Text, FlatList } from "react-native";
import ToDo from "./ToDo";

export default function ToDoList({ toDosData }) {
  return (
    <FlatList
      data={toDosData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ToDo {...item} />}
    />
  );
}
