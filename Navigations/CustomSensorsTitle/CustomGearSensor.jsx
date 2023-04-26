import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";
export default function CustomTitleSensor({props}){
    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params.id;

    const styles = {
        gear : {
            marginEnd: 5
        }
    };
    return (
        <TouchableOpacity onPress={() => navigation.navigate('EditSensor', {id : 2})}>
            <FontAwesome name="gear" size={24} />
        </TouchableOpacity>
    )
}