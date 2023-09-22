import {ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, View} from "react-native";
import {color, theme, pickerSelectStyles} from "../../../../assets/styles/style";
import {useContext, useEffect, useState} from "react";
import Text from '../../../../Components/Text'
import {UserContext} from "../../../../Context/UserContext";
import {Picker} from '@react-native-picker/picker';
import {FontAwesome5} from "@expo/vector-icons";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Select from "../../../../Components/Select";
import {fetchRoute} from "../../../../Utils/auth";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";

export default function CreateNotification(){

    const userContext = useContext(UserContext);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const mode = userContext.theme;
    const [data, setData] = useState();
    const navigation = useNavigation()
    const [scale, setScale] = useState();
    const [sensor, setSensor] = useState();
    const [rooms, setRooms] = useState();
    const [room, setRoom] = useState();
    const route = useRoute();
    const focus = useIsFocused();
    const place = userContext.place

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        searchRooms(place.id)
    }, [focus])

    const createConfig = async () => {
        const response = await fetchRoute("/notifications-config/create", "POST", {
            "title": "Invited",
            "data": "",
            "percent": 3,
            "message": "Vous avez été invité par",
            "user_id": 1,
            "date" : "2022-04-25"
        },
            userContext.token);
        if (!response) {
            throw new Error(
                `HTTP Error: ${response.status} ${response.statusText}`
            );
        }
        if(response){
            navigation.navigate("Notifications")
        }
    }

    const searchRooms = async place_id => {
        const rooms = await fetchRoute(
            "room/find-by-place",
            "post",
            { place: place_id },
            userContext.token
        );
        console.log("ROOM : ",rooms)
        const roomsList = rooms.map(r => {
            console.log("ROOM : ",r)
            return { label: `${r.name}`, value: `${r.id}` };
        })
        setRooms(roomsList);
    };

    const styles = StyleSheet.create({
        content: {
            width: '90%',
            alignSelf: 'center'
        },
        input: {
            width: '100%',
            margin: 0
        },
        inputGroup: {
            alignItems: 'flex-start',
            width: '100%',
            marginTop: 24
        },
        scale : {
            marginTop: 8,
        },
        label: {
            marginBottom: -10
        },
        select: {
            width : "100%",
            borderRadius: 8,
            backgroundColor : color[mode].secondaryBackground,
            marginTop: 8
        },
        radio : {
            marginTop: 8,
            backgroundColor : color[mode].secondaryBackground,
            borderColor: color[mode].grey,
            borderWidth: 2,
            padding: 12,
            width: "100%",
            flexDirection: "row",
            borderRadius: 4,
            alignItems : "center",
            danger : {
                padding: 12
            },
            text : {
                marginLeft: 16,
                width : "90%"
            },
            active : {
                bad : {
                    borderColor: color[mode].red,
                },
                normal : {
                    borderColor: color[mode].yellow,
                },
                good : {
                    borderColor: color[mode].green,
                }
            }
        },
        radioLayout : {
            padding: 12,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            text : {

            },
            radio : {
                flexDirection: "column",
                alignItems: "center"
            }
        },
        bottom: {
            backgroundColor: color[mode].background,
            zIndex: 10,
            width: '100%',
            height: '10%',
            marginTop: 'auto',
            bottom: 0,
            // position: "fixed",
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        area : {
            height: 100,
            width: "100%",
            borderRadius: 8,
            padding : 12,
            paddingTop : 12,
            marginTop: 8,
            backgroundColor: color[mode].secondaryBackground,
            layout : {
                height: 100,
                flexDirection: 'column',
                alignItems: "flex-start"
            }
        },
    });

    const selectData = {
        1 : {
            "name" : 'name',
            "value" : 'CO2',
        },
    }

    const datasList = [
        {value : "co2", label : "Co2"},
        {value : "no2", label : "NO2"},
        {value : "lumen", label : "Luminosité"},
        {value : "temp", label : "Température"},
        {value : "humidity", label : "Humidité de l'air"},
        {value : "sound", label : "Polution sonore"},
        {value : "PM1", label : "PM1"},
        {value : "PM2.5", label : "PM2.5"},
        {value : "PM10", label : "PM10"},
        {value : "wind", label : "Force du vent"},
    ]

    return (
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Titre</Text>
                <TextInput style={theme[mode].inputGroup.input} placeholderTextColor={color[mode].textSecondary} placeholder={"Entrez le titre de la notification"}/>
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Donnée</Text>
                <Select
                    label="Sélectionnez une option"
                    style={theme[mode].inputGroup.input}
                    data={datasList}
                    onSelect={(value) => {
                        setData(value);
                    }}
                    defaultValue={data}
                />
            </View>
            <View style={styles.scale}>
                <Text style={styles.radioLayout.text}>Echelle</Text>
                <View style={styles.radioLayout.radio}>
                    <TouchableOpacity onPress={() => setScale("good")} style={[styles.radio, scale == "good" ? styles.radio.active.good : ""]}>
                        <FontAwesome5 name="check" size={18} color={color[mode].green}/>
                        <Text style={styles.radio.text}>Envoie une notification lorsque la qualité de l'air du capteur est excellente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScale("normal")} style={[styles.radio, scale == "normal" ? styles.radio.active.normal : ""]}>
                        <FontAwesome name="warning" size={18} color={color[mode].yellow} />
                        <Text style={styles.radio.text}>Envoie une notification lorsque la qualité de l'air du capteur est inquiétante</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScale("bad")} style={[styles.radio, styles.radio.danger, scale == "bad" ? styles.radio.active.bad : ""]}>
                        <Ionicons name="nuclear" size={22} color={color[mode].red} />
                        <Text style={styles.radio.text}>Envoie une notification lorsque la qualité de l'air du capteur est dangereuse</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[theme[mode].inputGroup, styles.area.layout]}>
                <Text style={theme[mode].inputGroup.label}>Message</Text>
                <TextInput numberOfLines={20} multiline={true} style={[ styles.area]} placeholderTextColor={color[mode].textSecondary} placeholder={"Entrez la description de la notification"}/>
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Pièce</Text>
                <Select
                    label="Sélectionnez une option"
                    style={theme[mode].inputGroup.input}
                    data={rooms}
                    onSelect={(value) => {
                        setRoom(value);
                    }}
                    defaultValue={sensor}
                />
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={createConfig}>
                    <Text style={theme[mode].btnText}>
                        Créer la notification
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}