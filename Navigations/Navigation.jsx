import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CreateSensor from '../Pages/Sensors/Create';

export default function Navigation() {

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
            initialRouteName={"Home"}
        >
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
            />
        </Stack.Navigator>
    )
}