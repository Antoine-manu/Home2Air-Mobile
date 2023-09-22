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
import ShareButton from '../Share/ShareButton';
import {UserContext} from "../../../Context/UserContext";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {fetchRoute} from "../../../Utils/auth";
import { useRoute } from '@react-navigation/native';
import SmallSensor from "../../../Components/smallSensor";
import {FontAwesome5, Entypo, Feather, MaterialCommunityIcons} from "@expo/vector-icons";

export default function SingleSpace(){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const navigation = useNavigation()
    const [rooms, setRooms] = useState([]);
    const [spaceName, setSpaceName] = useState();
    const [space, setSpace] = useState([]);
    const [newRoom, setNewRoom] = useState("");
    const [addColor, setAddColor] = useState(color[mode].textSecondary);

    const route = useRoute();
    const isFocused = useIsFocused();


    useEffect(() => {
        searchRooms(route.params?.yourParam);
        searchPlace(route.params?.yourParam);
    }, [isFocused]);

    useEffect(() => {
        editSpace()
    }, [spaceName]);

    const searchRooms = async id => {
        const rooms = await fetchRoute(
            "room/find-by-place",
            "post",
            { place: id },
            userContext.token
        );
        setRooms(rooms);
    };

    const addRoom = async () => {
        if(newRoom !== ""){
            const jsonData = {
                name : newRoom,
                place_id : space.id
            };
            const response = await fetchRoute(
                'room/create',
                'POST',
                jsonData,
                userContext.token
            );
            if(response){
                searchRooms(route.params?.yourParam);
                searchPlace(route.params?.yourParam);
                setNewRoom("")
            }
        }
    };

    const disableSpace = async () => {
        try {
            const response = await fetchRoute(
                `place/update/${space.id}`,
                'post',
                {
                    deletedAt: new Date(),
                },
                userContext.token
            );
            if (response) {
                navigation.goBack();
            }
        } catch (error) {
            console.error('erroor ' , error);
        }
    };

    const editSpace = async () => {
        try {
            const response = await fetchRoute(
                `place/update/${space.id}`,
                'post',
                {
                    name: spaceName,
                },
                userContext.token
            );
            if (response) {

            }
        } catch (error) {
            console.error('erroor ' , error);
        }
    };

   const searchPlace = async id => {
        const place = await fetchRoute(
            "place/find-one-by-id",
            "post",
            { id: id },
            userContext.token
        );
        setSpace(place);
        setSpaceName(place.name)
    };

    const styles = StyleSheet.create({
        content : {
            width: "100%",
            alignSelf: "center"
        },
        container : {
          width: "100%"
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
        icon : {
            marginTop: 8,
        },
        iconAdd : {
            marginTop: 6,
        },
        iconShare : {
            marginTop: 14,
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
        title : {
            padding: "5%",
            borderBottomWidth: 1,
            borderBottomColor: color[mode].grey,
            text : {
                fontSize: 16,
                fontWeight: 'bold',
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
        customInput : {
            width: "90%",
            marginLeft: "5%",
            marginBottom: 32
        }
    })

    return(
        <>
            <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.title.text}>Informations</Text>
                    </View>
                    <View style={[theme[mode].inputGroup, styles.customInput]}>
                        <Text style={theme[mode].inputGroup.label}>Nom de l'espace</Text>
                        <TextInput style={[theme[mode].inputGroup.input]} defaultValue={spaceName} onChangeText={setSpaceName}/>
                    </View>
                    <TouchableOpacity style={styles.switchGroupe} onPress={() => navigation.navigate('ShareSpace', { place: space})}>
                        <View style={styles.switchGroupe.label}>
                            <Text style={styles.switchGroupe.label.title}>Partager l'espace</Text>
                            <Text style={styles.switchGroupe.label.subtitle}>Envoyer une invitation a rejoindre votre espace par email</Text>
                        </View>
                        <Entypo  style={styles.iconShare} name="share" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.switchGroupe} onPress={() => disableSpace()}>
                        <View style={styles.switchGroupe.label}>
                            <Text style={[styles.switchGroupe.label.title, styles.red]}>Désactiver l'espace</Text>
                            <Text style={[styles.switchGroupe.label.subtitle, styles.red.disable]}>Attention en cliquant ici vous supprimerez l'espace {space.name}</Text>
                        </View>
                        <MaterialCommunityIcons style={styles.iconDelete} name="delete" size={24} color={color[mode].red} />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.title.text}>Pièces</Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput style={[styles.inputGroup.input]} value={newRoom} onFocus={() =>setAddColor(addColor == color[mode].textSecondary ? color[mode].primary : color[mode].text )} placeholder={"Ajouter une nouvelle pièce"} onChangeText={setNewRoom}/>
                    <TouchableOpacity onPress={addRoom}>
                        <Entypo style={styles.iconAdd} name="circle-with-plus" size={24} color={addColor} />
                    </TouchableOpacity>
                </View>
                {rooms.length > 0
                    ? rooms.map(room =>
                    <TouchableOpacity style={styles.switchGroupe} key={room.id} onPress={() => navigation.navigate("EditRoom", {room : room})}>
                        <View style={styles.switchGroupe.label}>
                            <Text style={styles.switchGroupe.label.title}>{room.name}</Text>
                            <Text style={styles.switchGroupe.label.subtitle}>{room.Sensor.length} capteurs(s)</Text>
                        </View>
                        <FontAwesome5 style={styles.icon}  name="angle-right" size={20} color="black" />
                    </TouchableOpacity>
                    )
                    : ""}
            </ScrollView>
        </>
    )
}