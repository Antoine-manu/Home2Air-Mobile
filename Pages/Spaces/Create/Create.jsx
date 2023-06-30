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

export default function CreateSpace(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation()
    const [id, setId] = useState(userContext.userId);
    const [name, setName] = useState("");

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

            }
        } catch (error) {
            console.error('erroor ' , error);
        }
    };

    const createSpace = async () => {
        const createdBy = `${userContext.userId}`;
        const jsonData = {
            name,
            createdBy
        };
        const response = await fetchRoute(
            'place/create',
            'POST',
            jsonData,
            userContext.token
        );
        if(response){
            navigation.navigate("Spaces")
        }
    }

    const styles = StyleSheet.create({
        content : {
            marginTop: 4,
            width: "90%",
            alignSelf: "center",
            flex: 1
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
        }
    })

    return(
        <>
            <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
                <View style={theme[mode].inputGroup}>
                    <Text style={theme[mode].inputGroup.label}>Nom de l'espace</Text>
                    <TextInput style={theme[mode].inputGroup.input} onChangeText={setName} value={name}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={[theme[mode].btn, theme[mode].shadow]} onPress={createSpace}>
                        <Text style={[theme[mode].btnText]}>
                            Créer l'espace
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}