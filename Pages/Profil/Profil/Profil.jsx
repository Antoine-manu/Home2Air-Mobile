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
import {useContext, useEffect, useState} from "react";
import Text from "../../../Components/Text";
import {UserContext} from "../../../Context/UserContext";
import {useNavigation} from "@react-navigation/native";
import {fetchRoute} from "../../../Utils/auth";

export default function Profil(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation()
    const [firstname, setFirstName] = useState({});
    const [lastname, setLastName] = useState({});
    const [email, setEmail] = useState({});
    const [id, setId] = useState(userContext.userId);
    const [username, setUsername] = useState(userContext.userId);
    const [picture, setPicture] = useState({});
    const [loading, setIsLoading] = useState({});

    useEffect(() => {
        findUserData();
    }, []);

    const findUserData = async () => {
        try {
            const response = await fetchRoute(
                'user/find-one-by-id',
                'post',
                { id },
                userContext.token
            );
            if (response) {
                setEmail(response.email)
                setFirstName(response.first_name)
                setLastName(response.last_name)
                setUsername(response.username)
            }
        } catch (error) {
            console.error('erroor ' , error);
            setIsLoading(false);
        }
    };

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
            backgroundColor: color[mode].modalBg,
            text : {
                color: color[mode].red,
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
                    <TextInput style={theme[mode].inputGroup.inputDisable} editable={false} defaultValue={firstname}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Nom</Text>
                    <TextInput style={theme[mode].inputGroup.inputDisable} editable={false} defaultValue={lastname}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Email</Text>
                    <TextInput style={theme[mode].inputGroup.inputDisable} editable={false} defaultValue={email}/>
                </View>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Identifiant</Text>
                    <TextInput style={theme[mode].inputGroup.inputDisable} editable={false} defaultValue={username}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={[theme[mode].btn, styles.btn, theme[mode].shadow]} onPress={() => userContext.setToken(null)}>
                        <Text style={[theme[mode].btnText, styles.btn.text]}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}