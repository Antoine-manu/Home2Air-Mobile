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
import {fetchRoute} from "../../../Utils/auth";
import {useNavigation} from "@react-navigation/native";

export default function SingleNotification(datas){

    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const navigation = useNavigation();
    let colorNotif = datas.datas.color;


    const updateUserData = async () => {
        try {
            const response = await fetchRoute(
                `notifications/update/${datas.datas.id}`,
                'post',
                {
                    read: true,
                },
                userContext.token
            );
            if (response) {
                navigation.navigate("Récente")
            }
        } catch (error) {
            console.error('erroor ' , error);
        }
    };
    console.log(datas.datas)
    if(datas.datas.read == true){
        colorNotif = "textSecondary";
        console.log("oui")
    } else if (datas.datas.custom == false){
        colorNotif = "primary"
    }
    const icon = datas.datas.data == "" ? "check-circle" : "check-circle"

    const styles = StyleSheet.create({
        notif: {
            marginTop: 16,
            borderRadius: 8,
            alignItems:"center",
            padding: 16,
            backgroundColor: color[mode].secondaryBackground,
            flexDirection: "row",
            width: "90%",
            marginStart: "5%",
            justifyContent: "space-between",
            text : {
                width: "75%",
                color : color[mode][colorNotif]
            }
        },
        disableDiv : {
            width: 20
        }
    });

    return (
        <View style={[styles.notif, theme[mode].shadow]}>
            <FontAwesome name={icon} size={20} color={color[mode][colorNotif]}/>
            <Text style={styles.notif.text}>{datas.datas.title}</Text>
            {datas.datas.read == true ?
                <View style={styles.disableDiv}></View>
                :
                <TouchableOpacity onPress={() => updateUserData()} >
                    <FontAwesome name={"close"} size={20} color={color[mode].red}/>
                </TouchableOpacity>
            }
        </View>
    )
}