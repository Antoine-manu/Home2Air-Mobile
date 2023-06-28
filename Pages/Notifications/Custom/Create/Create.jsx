import {ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, View} from "react-native";
import {color, theme, pickerSelectStyles} from "../../../../assets/styles/style";
import {useContext, useState} from "react";
import Text from '../../../../Components/Text'
import {UserContext} from "../../../../Context/UserContext";
import {Picker} from '@react-native-picker/picker';
import {FontAwesome5} from "@expo/vector-icons";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function CreateNotification(){

    const userContext = useContext(UserContext);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const mode = userContext.theme;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
        label: {
            marginBottom: -10
        },
        select: {
            width : "100%"
        },
        radio : {
            padding: 8,
            borderRadius: 4,
            marginLeft : 8,
            danger : {
                padding: 5.5
            }
        },
        radioLayout : {
            padding: 12,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            text : {

            },
            radio : {
                flexDirection: "row",
                alignItems: "center"
            }
        },
        bottom: {
            backgroundColor: color[mode].background,
            zIndex: 10,
            width: '100%',
            height: '15%',
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
        }
    });

    const selectData = {
        1 : {
            "name" : 'name',
            "value" : 'CO2',
        },
    }

    return (
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Titre</Text>
                <TextInput style={theme[mode].inputGroup.input} placeholderTextColor={color[mode].textSecondary} placeholder={"Entrez le titre de la notification"}/>
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Donnée</Text>
                <TextInput style={theme[mode].inputGroup.input} placeholderTextColor={color[mode].textSecondary} placeholder={"Sélectionnez une donnée"}/>
                {/*Select here*/}
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={styles.radioLayout.text}>Echelle</Text>
                <View style={styles.radioLayout.radio}>
                    <TouchableOpacity style={[styles.radio]}>
                        <FontAwesome5 name="check" size={18} color={color[mode].green}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.radio]}>
                        <FontAwesome name="warning" size={18} color={color[mode].yellow} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.radio, styles.radio.danger]}>
                        <Ionicons name="nuclear" size={22} color={color[mode].red} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[theme[mode].inputGroup, styles.area.layout]}>
                <Text style={theme[mode].inputGroup.label}>Message</Text>
                <TextInput numberOfLines={20} multiline={true} style={[ styles.area]} placeholderTextColor={color[mode].textSecondary} placeholder={"Entrez la description de la notification"}/>
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Icon</Text>
                <TextInput style={theme[mode].inputGroup.input} placeholderTextColor={color[mode].textSecondary} placeholder={"Icon"}/>
                {/*Select here*/}
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={[theme[mode].btn, styles.btn]}>
                    <Text style={theme[mode].btnText}>
                        Créer la notification
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}