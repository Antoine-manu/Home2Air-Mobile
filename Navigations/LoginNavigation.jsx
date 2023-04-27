import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from "../Pages/Home";
import CreateSensor from "../Pages/Sensors/Create";
import EditSensor from "../Pages/Sensors/Edit";
import EditProfil from "../Pages/Profil/Edit";
import Sensor from "../Pages/Sensors/Single";
import {UserContext} from "../Context/UserContext";
import CustomGearSensor from "./CustomSensorsTitle/CustomGearSensor";
import CustomGearProfil from "./CustomSensorsTitle/CustomGearProfil";
import CustomTitleSensor from "./CustomSensorsTitle/CustomTitleSensor";
import Profil from "../Pages/Profil/Profil";
import Settings from "../Pages/Profil/Settings";
import {color} from "../assets/styles/style";
import {useContext} from "react";

export default function LoginNavigation() {
	const Stack = createNativeStackNavigator();
	const userContext = useContext(UserContext);
	const mode = userContext.theme
	return (
		<Stack.Navigator
			initialRouteName={'Login'}
		>
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
						title: 'Inscription',
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
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
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						title:"Créer un capteur",
					}}
				/>
				<Stack.Screen
					name="EditSensor"
					component={EditSensor}
					options={{
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						title:"Editer un capteur",
					}}
				/>
				<Stack.Screen
					name="Sensor"
					component={Sensor}
					options={{
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						headerTitle: (props)=> <CustomTitleSensor {...props} />,
						headerRight : (props)=> <CustomGearSensor {...props} />
					}}
				/>
				<Stack.Screen
					name="Profil"
					component={Profil}
					options={{
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						title: "Votre profil",
						headerRight : (props)=> <CustomGearProfil	 {...props} />
					}}
				/>
				<Stack.Screen
					name="EditProfil"
					component={EditProfil}
					options={{
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						title: "Editez votre profil",
					}}
				/>
				<Stack.Screen
					name="Settings"
					component={Settings}
					options={{
						headerStyle: {
							backgroundColor: color[mode].backgroundHeader
						},
						headerTitleStyle : {
							color: color[mode].text
						},
						title: "Paramètres",
					}}
				/>
			</Stack.Group>
			}
		</Stack.Navigator>
	);
}
