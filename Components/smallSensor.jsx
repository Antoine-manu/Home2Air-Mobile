import {StyleSheet, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Text from "./Text";
import {theme, color} from "../assets/styles/style";
import {useNavigation} from "@react-navigation/native";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";
export default function smallSensor() {

    const navigation = useNavigation();
    const userContext = useContext(UserContext);
    const mode = userContext.theme

    const styles = {
        btnSmall : {
            height : 32,
            padding: 8,
            paddingLeft: 32,
            paddingRight: 32,
        },
        btnSmallText : {

        },
        smallSensor : {
            width : 350,
            height: 110,
            padding: 16 ,
            borderRadius: 16,
            backgroundColor: color[mode].modalBg,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        smallSensorLayout : {
            left : {
                alignItems: "start",
                justifyContent: "space-between",
                textLayout: {
                    fontSize: 16,
                }
            },
            right : {
                alignItems: "end",
                justifyContent: "space-between",
                gear : {
                    width : "100%",
                    icon : {
                        alignSelf: "flex-end",
                        color : color[mode].text
                    }
                }
            }
        }
    }

    return(
        <>
            <View style={[styles.smallSensor, theme[mode].shadow]}>
                <View style={styles.smallSensorLayout.left}>
                    <Text style={styles.smallSensorLayout.left.textLayout}>Capteur -locate-</Text>
                    <Text style={styles.smallSensorLayout.left.textLayout}>-data- AQI</Text>
                </View>
                <View style={styles.smallSensorLayout.right}>
                    <TouchableOpacity style={styles.smallSensorLayout.right.gear} onPress={() => navigation.navigate('EditSensor', {id : 2})}>
                        <FontAwesome name="gear" size={24} style={styles.smallSensorLayout.right.gear.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[theme[mode].btn, styles.btnSmall]} onPress={() => navigation.navigate('Sensor', {id : 2, name : "Salon"})}>
                        <Text style={[theme[mode].btnText, styles.btnSmallText]} >
                            Voir
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}