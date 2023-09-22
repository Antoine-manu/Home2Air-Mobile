import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import {color, theme} from "../../assets/styles/style";
import {useContext, useEffect, useState} from "react";
import Text from "../../Components/Text";
import {UserContext} from "../../Context/UserContext";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {fetchRoute} from "../../Utils/auth";
import SmallSensor from "../../Components/smallSensor";
import {MaterialIcons, FontAwesome5, Feather, Entypo} from "@expo/vector-icons";

export default function Space(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation()
    const [places, setPlaces] = useState([]);
    const [newSpace, setNewSpace] = useState("");
    const [_default, setDefault] = useState([]);
    const [addColor, setAddColor] = useState(color[mode].textSecondary);
    const isFocused = useIsFocused()

    useEffect(() => {
        getPlacesList();
    }, [isFocused]);

    const addSpace = async () => {
        if(newSpace !== ""){
            const createdBy = `${userContext.userId}`;
            const jsonData = {
                name : newSpace,
                createdBy
            };
            const response = await fetchRoute(
                'place/create',
                'POST',
                jsonData,
                userContext.token
            );
            if(response){
                getPlacesList();
                setNewSpace("")
            }
        }
    }
    const getPlacesList = async () => {
        const place = await fetchRoute(
            "/place/find-user-place",
            "post",
            {
                user_id: userContext.userId
            },
            userContext.token
        );
        setPlaces(place);
        setDefault(place[0]);
    };

    const navigateToSpaces = (param, name) => {
        navigation.navigate('SingleSpace', { yourParam: param , name : name});
    };

    const styles = StyleSheet.create({
        content : {
            width: "100%",
            alignSelf: "center"
        },
        switchGroupe: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: color[mode].grey,
            backgroundColor : color[mode].secondaryBackground,
            label: {
                width: '70%',
                title: {
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                subtitle: {
                    fontSize: 12,
                    color: color[mode].darkgrey,
                    marginTop: 4
                }
            }
        },
        inputGroup : {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: color[mode].grey,
            backgroundColor : color[mode].secondaryBackground,
            label : {
                fontSize: 14,
                fontWeight: 'bold'
            },
            input : {

            }
        },
        icon : {
            marginTop: 8,
        }
    })

    return(
        <>
            <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
                <View style={styles.inputGroup}>
                    <TextInput style={[styles.inputGroup.input]} onFocus={() =>setAddColor(addColor == color[mode].textSecondary ? color[mode].primary : color[mode].text )} value={newSpace} placeholder={"Ajouter un nouvel espace"} onChangeText={setNewSpace}/>
                    <TouchableOpacity onPress={addSpace}>
                        <Entypo style={styles.iconAdd} name="circle-with-plus" size={24} color={addColor} />
                    </TouchableOpacity>
                </View>
                {places.length > 0
                    ? places.map(place =>
                        place.createdBy == userContext.userId ?
                            <TouchableOpacity style={styles.switchGroupe} onPress={() => navigateToSpaces(place.id, place.name)} key={place.id}>
                                <View style={styles.switchGroupe.label}>
                                    <Text style={styles.switchGroupe.label.title}>{place.name}</Text>
                                    <Text style={styles.switchGroupe.label.subtitle}>{place.Room.length} piece(s)</Text>
                                </View>
                                <FontAwesome5 style={styles.icon}  name="angle-right" size={20} color={color[mode].text} />
                            </TouchableOpacity>
                        : ""
                    )
                    : ""}
            </ScrollView>
        </>
    )
}