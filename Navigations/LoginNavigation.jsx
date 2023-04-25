import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from "../Pages/Home";
import CreateSensor from "../Pages/Sensors/Create";
import EditSensor from "../Pages/Sensors/Edit";
import {UserContext} from "../Context/UserContext";
import {useContext} from "react";

export default function LoginNavigation() {
	const Stack = createNativeStackNavigator();
	const userContext = useContext(UserContext);
	return (
		<Stack.Navigator initialRouteName={'Login'}>
			{userContext.token == null ?
			<Stack.Group>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{
						title: 'Inscription'
					}}
				/>
			</Stack.Group>
				:
			<Stack.Group>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						headerShown:false,
					}}
				/>
				<Stack.Screen
					name="CreateSensor"
					component={CreateSensor}
					options={{
						title:"Créer un capteur",
					}}
				/>
				<Stack.Screen
					name="EditSensor"
					component={EditSensor}
					options={{
						title:"Editer un capteur",
					}}
				/>
			</Stack.Group>
			}
		</Stack.Navigator>
	);
}
