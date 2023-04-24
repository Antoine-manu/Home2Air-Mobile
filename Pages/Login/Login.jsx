import { StyleSheet, Text, View, Image } from 'react-native';
export default function Home({data}) {

    const styles = StyleSheet.create({
        logo: {
            width: 400,
            height: 60,
        },
        container : {

        }
    });

    return(
        <View style={styles.container}>

            <Image
                style={styles.logo}
                resizeMode={"contain"}
                source={require('../../assets/logo.png')}
            />
        </View>
    )
}