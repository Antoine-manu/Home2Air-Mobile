import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Switch} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {theme, pickerSelectStyles, color} from "../../../assets/styles/style";
import {useState} from "react";
export default function EditSensor({navigation, route}) {

    const { id } = route.params;
    const [name, setName] = useState('Canapé');
    const [room, setRoom] = useState('Salon');
    const [temperature, setTemperature] = useState('Celsius');
    const [space, setSpace] = useState('Maison');
    const [reference, setReference] = useState('DDSDSSADZA');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const styles =  StyleSheet.create({
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
            backgroundColor: color.lightgrey,
            padding: 12,
            borderRadius: 8,

        },
        switchGroup : {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop : 20
        },
        label: {
            marginBottom: -10
        },
        container : {
            width: "90%",
            marginLeft: "5%",
            alignItems: "center",
            flex: 1
        },
        bottom : {
            backgroundColor: color.background,
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
            backgroundColor: color.red
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

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Informations</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex : Home"
                    defaultValue={name}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Piece</Text>
                <RNPickerSelect
                    value={room}
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
                    trackColor={{false: color.grey, true: color.blue}}
                    thumbColor={isEnabled ? color.light : color.light}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={[theme.btn, styles.btn]}>
                    <Text style={theme.btnText}>
                        Supprimer
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}