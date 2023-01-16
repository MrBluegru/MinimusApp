import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./toDosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
