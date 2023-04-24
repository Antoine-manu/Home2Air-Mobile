import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import {theme} from "../../assets/styles/style";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Register({data}) {

    const styles = StyleSheet.create({
        container : {
            marginTop: 50,
            alignItems: "center",
            flex: 1,
        },

        header : {
            container : {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

            },
            right : {
                layout : {
                    flexDirection: "row",
                    alignItems: "center",
                },
                pp: {
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                },
            }
        }
    });

    return(

        <View style={styles.container}>
            <View style={styles.header.container}>
                <Text style={styles.header.title}>Maison</Text>
                <View style={styles.header.right.layout}>
                    <FontAwesome5 name="bell" size={24} color="black" />
                    <Image style={styles.header.right.pp} source={require("../../assets/pp.jpeg")} />
                </View>
            </View>
            <TextInput/>
            <View>

            </View>

        </View>
    )
}