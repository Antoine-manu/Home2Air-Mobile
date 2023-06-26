import {ScrollView, StyleSheet, TextInput, View} from "react-native";
import {color, theme, pickerSelectStyles} from "../../../../assets/styles/style";
import {useContext, useState} from "react";
import Text from '../../../../Components/Text'
import {UserContext} from "../../../../Context/UserContext";
import {Picker} from '@react-native-picker/picker';

export default function CreateNotification(){

    const userContext = useContext(UserContext);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const mode = userContext.theme;
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
        }
    });

    return (
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Titre</Text>
                <TextInput style={theme[mode].inputGroup.input} editable={false} placeholderTextColor={color[mode].textSecondary} placeholder={"Entrez le titre de la notification"}/>
            </View>
            <View style={theme[mode].inputGroup}>
                <Text style={theme[mode].inputGroup.label}>Donnée</Text>
            </View>
        </ScrollView>
    )
}