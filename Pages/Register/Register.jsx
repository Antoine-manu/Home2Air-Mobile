import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import {theme} from "../../assets/styles/style";
export default function Register({data}) {

    const styles = StyleSheet.create({
        container : {
            alignItems: "center",
            flex: 1,
        },
        input: {
            width: 300,
            height: 40,
            backgroundColor: "#f7f7f7",
            borderRadius: 32,
            margin: 12,
            marginTop: 16,
            paddingLeft: 18,
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: {
                width: 6,
                height: 6
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            padding: 10,
        },
        inputBox : {
            marginTop: 26
        },
        btn : {
            marginTop: 24,
            backgroundColor: theme.primary,
            padding: 12,
            paddingLeft: 48,
            paddingRight: 48,
            borderRadius: 32,
        },
        btnText : {
            color: "#FFFFFF",
        },
    });

    return(

        <View style={styles.container}>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Identifiant"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmer le mot de passe"
                />
            </View>

            <TouchableOpacity style = {styles.btn}>
                <Text style={styles.btnText}>S'inscrire</Text>
            </TouchableOpacity>

        </View>
    )
}