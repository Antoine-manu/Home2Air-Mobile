import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, {useContext, useEffect, useState} from 'react';
import Recent from './Recent'
import Passed from './Passed'
import Custom from './Custom'
import {color, theme} from "../../assets/styles/style";
import {UserContext} from "../../Context/UserContext";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import CustomCreateNotif from "../../Navigations/CustomSensorsTitle/CustomCreateNotif";

export default function Notifications(){

    const Tab = createMaterialTopTabNavigator();
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const notif = userContext.isNotif;
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    navigation.setOptions({
        headerRight: () => (
            <CustomCreateNotif/>
        ),
    });


    return(
        <>
            <Tab.Navigator >
                <Tab.Screen
                        options={{
                            tabBarInactiveTintColor : color[mode].text,
                            tabBarActiveTintColor: color[mode].primary,
                            tabBarLabelStyle : {
                                textTransform: "capitalize"
                            }
                        }}
                        name="Récente"
                        component={Recent}

                />
                <Tab.Screen
                    options={{
                            tabBarInactiveTintColor : color[mode].text,
                            tabBarActiveTintColor: color[mode].primary,
                            tabBarLabelStyle : {
                                textTransform: "capitalize"
                            }
                        }}
                    name="Historique"
                    component={Passed}
                />
                <Tab.Screen
                    options={{
                            tabBarInactiveTintColor : color[mode].text,
                            tabBarActiveTintColor: color[mode].primary,
                            tabBarLabelStyle : {
                                textTransform: "capitalize"
                            }
                        }}
                    name="Perso"
                    component={Custom}
                />
            </Tab.Navigator>
        </>
    )
}