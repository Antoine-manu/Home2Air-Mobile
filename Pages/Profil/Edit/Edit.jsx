import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import {color, theme} from "../../../assets/styles/style";
import {useContext} from "react";
import Text from "../../../Components/Text";
import {UserContext} from "../../../Context/UserContext";
import {useNavigation} from "@react-navigation/native";

export default function Profil(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        content : {
            marginTop: 24,
            width: "90%",
            alignSelf: "center"
        },
        image: {
            width: 150,
            height: 150,
            borderRadius: 80,
            marginBottom: 16,
        },
        formGroup : {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop : 20,
            backgroundColor: color[mode].lightgrey,
            padding: 12,
            borderRadius: 8,
        },
        password :{
            paddingRight: 20
        },
        bottom : {
            backgroundColor: color[mode].background,
            zIndex: 10,
            width: "100%",
            height: "15%",
            marginTop : "auto",
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-start"
        },
        btn : {
            width: 250,
            alignItems: "center",
            backgroundColor: color[mode].primary,
            text : {
                color: color[mode].light,
                fontWeight: "bold"
            }
        },
    })

    return(
        <>
            <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
                <Image style={styles.image} source={require('../../../assets/pp.jpeg')}/>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Prénom</Text>
                    <TextInput style={theme[mode].inputGroup.input} defaultValue={"Antoine"}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Nom</Text>
                    <TextInput style={theme[mode].inputGroup.input} defaultValue={"Gaudry"}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Email</Text>
                    <TextInput style={theme[mode].inputGroup.input} defaultValue={"Antoine.gaudry@email.com"}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Identifiant</Text>
                    <TextInput style={theme[mode].inputGroup.input} defaultValue={"Jepeta"}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Mot de passe</Text>
                    <TextInput style={[theme[mode].inputGroup.input, styles.password]} secureTextEntry defaultValue={"Antoine2001"}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={[theme[mode].btn, styles.btn, theme[mode].shadow]}>
                        <Text style={[theme[mode].btnText, styles.btn.text]}>
                            Mettre a jour
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}