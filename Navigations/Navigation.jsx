import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';

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
        </Stack.Navigator>
    )
}