import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import Text from '../../../Components/Text';
import {color, theme} from "../../../assets/styles/style";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function Choose(){
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const navigation = useNavigation()
    const route = useRoute();
    const place = route.params.place

    const styles = StyleSheet.create({
        content: {
            width: '90%',
            alignSelf: 'center',
            flex: 1,
            marginTop: 24
        },
        imageView: {
            padding: 16,
            marginTop: 24,
            borderWidth: 2,
            width: "90%",
            borderColor: "lightgrey",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            text : {
                marginBottom: 16,
                fontWeight: 'bold',
                textAlign: "center"
            }
        }
    });

    return(
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            <TouchableOpacity style={styles.imageView} onPress={() => {navigation.navigate('CreateSensor', {place : place})}}>
                <Text style={styles.imageView.text}>Remplissez manuellement les données du capteur</Text>
                <Image source={require('../../../assets/write.png')} style={{height: 200, width: 200}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageView} onPress={() => {navigation.navigate('ScanSensor', {place : place})}}>
                <Text style={styles.imageView.text} >Scannez le QR code sur l'etiquette du capteur</Text>
                <Image source={require('../../../assets/scan.png')} style={{height: 200, width: 200}}/>
            </TouchableOpacity>
        </ScrollView>
    );
}