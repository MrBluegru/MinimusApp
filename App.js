import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddToDo from "./screens/AddToDo";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar style={colorScheme === "light" ? "dark" : "light"} />
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Add Task"
						component={AddToDo}
						options={{ presentation: "modal" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
