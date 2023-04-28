import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Recent from './Recent'
import Passed from './Passed'
import Custom from './Custom'
export default function Notifications(){

    const Tab = createMaterialTopTabNavigator();

    return(
        <>
            <Tab.Navigator>
                <Tab.Screen name="Récente" component={Recent} />
                <Tab.Screen name="Historique" component={Passed} />
                <Tab.Screen name="Personalisées" component={Custom} />
            </Tab.Navigator>
        </>
    )
}