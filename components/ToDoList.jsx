import * as React from "react";
import { FlatList } from "react-native";
import ToDo from "./ToDo";

export default function ToDoList({ toDosData }) {
  return (
    <FlatList
      data={toDosData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ToDo {...item} />}
    />
  );
}
