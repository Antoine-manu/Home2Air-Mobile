import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {theme, pickerSelectStyles, color} from "../../../assets/styles/style";
import {useState} from "react";
export default function CreateSensor({navigation}) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [space, setSpace] = useState('');
    const [reference, setReference] = useState('');

    const styles =  StyleSheet.create({
        input : {
            width: "100%",
            margin: 0
        },
        inputGroup : {
            alignItems: "flex-start",
            width: "100%",
            marginTop : 24
        },
        label: {
            marginBottom: -10
        },
        container : {
            width: "80%",
            marginLeft: "10%",
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
            position: "fixed",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        btn : {
            width: 250,
            alignItems: "center"
        },
        hidden : {
            display: "none"
        }
    })

    console.log(room)

    return(
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={[theme.input, styles.input]}
                    placeholder="Ex : Home"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Piece</Text>
                <RNPickerSelect
                    onValueChange={(value) => setRoom(value)}
                    items={[
                        { label: "-Salon-", value: "Salon" },
                        { label: "-Chambre-", value: "Chambre" },
                    ]}
                    style={pickerSelectStyles}
                />
                <TextInput
                    style={styles.hidden}
                    defaultValue={room}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Référence</Text>
                <TextInput
                    style={[theme.input, styles.input]}
                    placeholder="Référence"
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={[theme.btn, styles.btn]}>
                    <Text style={theme.btnText}>
                        Créer le capteur
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}