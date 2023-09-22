import {StyleSheet, TouchableOpacity, View} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import React, {useContext, useEffect, useState} from "react";
import {color, theme} from "../assets/styles/style";
import Text from "./Text";
import {UserContext} from "../Context/UserContext";
import {Entypo, FontAwesome} from "@expo/vector-icons";

export default function QRScanner(props){
    const [hasPermission, setHasPermission] = useState(false);
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const requestPermissions = async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === "granted")
    }

    const handleBarCodeScanned = ({type, data}) => {
        console.log(data)
        props.submit(JSON.parse(data));
    }


    useEffect(() => {
        requestPermissions();
    }, []);

    const styles = StyleSheet.create({
        btn: {
            width: 40,
            justifyContent: 'center',
            height: 40,
            backgroundColor: 'tomato',
            alignItems: 'center',
            position: "absolute",
            top: 48,
            left:0
        }
    });

    if(hasPermission){
        return(
            <View style={styles.content}>
                <BarCodeScanner
                    onBarCodeScanned={props.data ?  undefined : handleBarCodeScanned}
                    style={{height: 300, width: 300, marginTop:48}}
                />
                <TouchableOpacity style={[styles.btn]} onPress={() => props.close(false)}>
                    <FontAwesome style={styles.icon} name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
}