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
import {useNavigation, useRoute} from "@react-navigation/native";
import {fetchRoute} from "../../../Utils/auth";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function CreateRoom(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const route = useRoute();
    const navigation = useNavigation()
    const place = route.params?.place;
    const [name, setName] = useState("");

    const createRoom = async () => {
        if(name !== ""){
            const jsonData = {
                name : name,
                place_id : place
            };
            const response = await fetchRoute(
                'room/create',
                'POST',
                jsonData,
                userContext.token
            );
            if(response){
                navigation.navigate("Home")
            }
        }
    };

    const styles = StyleSheet.create({
        content : {
            marginTop: 4,
            width: "90%",
            alignSelf: "center",
            flex: 1
        },
        switchGroupe: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop : 18,
            width: '110%',
            padding: 20,
            backgroundColor : color[mode].secondaryBackground,
            label: {
                width: '70%',
                title: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                subtitle: {
                    fontSize: 12,
                    color: color[mode].darkgrey,
                    marginTop: 4
                }
            }
        },
        red : {
            color : color[mode].red,
            disable : {
                color : color[mode].redSecondary,
            }
        },
        iconDelete : {
            marginTop : 12
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
                    <Text style={theme[mode].inputGroup.label}>Nom de la pièce</Text>
                    <TextInput style={theme[mode].inputGroup.input} onChangeText={setName} value={name}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={[theme[mode].btn, theme[mode].shadow]} onPress={createRoom}>
                        <Text style={[theme[mode].btnText]}>
                            Créer la pièce
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}