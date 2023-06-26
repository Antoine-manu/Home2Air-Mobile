import React, { useContext, useState } from 'react';
import {Feather, FontAwesome} from "@expo/vector-icons";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Text from '../../../Components/Text';
import {color, theme} from "../../../assets/styles/style";
import {UserContext} from "../../../Context/UserContext";

export default function SingleNotification(datas){

    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    let colorNotif = datas.datas.color;
    if(datas.datas.isPassed == true){
        colorNotif = "textSecondary";
    }

    const styles = StyleSheet.create({
        notif: {
            marginTop: 16,
            borderRadius: 8,
            alignItems:"center",
            padding: 16,
            backgroundColor: color[mode].background,
            flexDirection: "row",
            width: "90%",
            marginStart: "5%",
            justifyContent: "space-between",
            text : {
                width: "75%",
                color : color[mode][colorNotif]
            }
        },
    });

    return (
        <View style={[styles.notif, theme[mode].shadow]}>
            <FontAwesome name={datas.datas.icon} size={20} color={color[mode][colorNotif]}/>
            <Text style={styles.notif.text}> {datas.datas.text} </Text>
            <FontAwesome name={"close"} size={20} color={color[mode].textSecondary}/>
        </View>
    )
}