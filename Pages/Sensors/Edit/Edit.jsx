import {StyleSheet, View, Image, TextInput, Button, TouchableOpacity, Switch, ScrollView} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {theme, pickerSelectStyles, color} from "../../../assets/styles/style";
import {useContext, useState} from "react";
import Text from "../../../Components/Text";
import {UserContext} from "../../../Context/UserContext";
export default function EditSensor({navigation, route}) {

    const { id } = route.params;
    const [name, setName] = useState('Canapé');
    const [room, setRoom] = useState('Salon');
    const [temperature, setTemperature] = useState('Celsius');
    const [space, setSpace] = useState('Maison');
    const [reference, setReference] = useState('DDSDSSADZA');

    const [isEnabled, setIsEnabled] = useState(false);
    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const styles =  StyleSheet.create({
        content : {
            width: "90%",
            alignSelf: "center"
        },
        input : {
            alignItems: "center",
            borderRadius: 32,
            margin: 0,
            width:"80%",
            textAlign: "right"
        },
        inputGroup : {
            flexDirection: "row",
            alignItems: "flex-center",
            justifyContent: "space-between",
            width: "100%",
            marginTop : 20,
            backgroundColor: color[mode].secondaryBackground,
            padding: 12,
            borderRadius: 8,

        },
        label: {
            marginBottom: -10,
            color: color[mode].text
        },
        switchGroup : {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop : 20
        },
        bottom : {
            backgroundColor: color[mode].background,
            zIndex: 10,
            width: "100%",
            height: "15%",
            marginTop : "auto",
            bottom: 0,
            // position: "fixed",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        btn : {
            width: 250,
            alignItems: "center",
            backgroundColor: color[mode].red
        },
        hidden : {
            display: "none"
        },
        title : {
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginTop: 24
        }
    })

    const selectStyle = {
        inputIOS: {
            placeholder : {
                color : color[mode].text
            },
            color: color[mode].text
        },
        inputAndroid: {
            placeholder : {
                color : color[mode].text
            },
            color: color[mode].text
        }
    }

    return(
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            <Text style={styles.title}>Informations</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex : Home"
                    style={{color : color[mode].text}}
                    defaultValue={name}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Piece</Text>
                <RNPickerSelect
                    value={room}
                    style={selectStyle}
                    onValueChange={(value) => setRoom(value)}
                    items={[
                        { label: "-Salon-", value: "Salon" },
                        { label: "-Chambre-", value: "Chambre" },
                    ]}
                />
            </View>
                <TextInput
                    style={styles.hidden}
                    defaultValue={room}
                />
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Référence</Text>
                <TextInput
                    style={{color : color[mode].text}}
                    placeholder="Référence"
                    defaultValue={reference}
                />
            </View>
            <Text style={styles.title}>Paramètres généraux</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Temperature</Text>
                <RNPickerSelect
                    value={temperature}
                    onValueChange={(value) => setTemperature(value)}
                    style={selectStyle}
                    items={[
                        { label: "Celsius", value: "Celsius" },
                        { label: "Fahrenheit", value: "Fahrenheit" },
                    ]}
                />
            </View>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.switchGroup}>
                <Text>Notifications du capteur</Text>
                <Switch
                    trackColor={{false: color[mode].grey, true: color[mode].blue}}
                    thumbColor={isEnabled ? color[mode].light : color[mode].light}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={[theme[mode].btn, styles.btn]}>
                    <Text style={theme[mode].btnText}>
                        Supprimer
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}