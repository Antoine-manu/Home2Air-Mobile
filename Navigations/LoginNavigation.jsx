import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

export default function LoginNavigation() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName={'Login'}>
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
		</Stack.Navigator>
	);
}
