import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TextInput,
	Button,
	TouchableOpacity,
	Switch,
	Appearance
} from 'react-native';
import { color, theme } from '../../../assets/styles/style';
import Text from '../../../Components/Text';
import { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {UserContext} from "../../../Context/UserContext";
import {fetchRoute} from "../../../Utils/auth";

export default function Settings(){

    const userContext = useContext(UserContext);
    const [isEnabled, setIsEnabled] = useState(userContext.isNotif);
    const setNotif = userContext.setIsNotif

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setNotif(isEnabled)
        updateUserData()
    };
    const mode = userContext.theme
		const setDarkMode = userContext.setTheme;
    const setMode = userContext.setTheme
    const id = userContext.userId

    const colorScheme = Appearance.getColorScheme();

    const updateUserData = async () => {
        try {
            const response = await fetchRoute(
                `user/update/${id}`,
                'post',
                {
                    darkMode: mode == "light" ? 1 : 0,
                    active: isEnabled == true ? 0 : 1,
                },
                userContext.token
            );
        } catch (error) {
            console.error('erroor ' , error);
        }
    };

	const styles = StyleSheet.create({
		content: {
			marginTop: 24,
			width: '90%',
			alignSelf: 'center'
		},
		switchGroupe: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
			marginBottom: 16,
			label: {
				width: '70%',
				title: {
					fontSize: 16,
					fontWeight: 'bold'
				},
				subtitle: {
					fontSize: 12,
					color: color[mode].darkgrey,
					marginTop: 4
				}
			}
		},
		daynight: {
			backgroundColor: color[mode].grey,
			alignItems: 'center',
			padding: 6,
			borderRadius: 32,
			height: 39,
			width: 39,

			icon: {},

			layout: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				width: '24%'
			}
		},
		day: {
			backgroundColor: color[mode].yellow,
			icon: {
				color: color.light
			}
		},
		night: {
			backgroundColor: color[mode].primary,
			icon: {
				color: color[mode].light
			}
		}
	});

    return(
        <>
            <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
                <View style={styles.switchGroupe}>
                    <View style={styles.switchGroupe.label}>
                        <Text style={styles.switchGroupe.label.title}>Notifications</Text>
                        <Text style={styles.switchGroupe.label.subtitle}>Permettre a l'application d'envoyer des notifications</Text>
                    </View>
                    <Switch
                        trackColor={{false: color[mode].grey, true: color[mode].blue}}
                        thumbColor={isEnabled ? color[mode].light : color[mode].light}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.switchGroupe}>
                    <View style={styles.switchGroupe.label}>
                        <Text style={styles.switchGroupe.label.title}>Mode d'affichage</Text>
                        <Text style={styles.switchGroupe.label.subtitle}>Selectionnez le mode d'affichage de votre application</Text>
                    </View>
                    <View style={styles.daynight.layout}>
                        <TouchableOpacity style={mode == "dark" ? styles.daynight : [styles.daynight, styles.day ]} onPress={() => {
                            setMode("light")
                            updateUserData()
                        }}>
                            <Ionicons style={mode == "dark" ? styles.daynight.icon : [styles.daynight.icon, styles.day.icon ]} name="sunny" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity  style={mode == "dark" ? [styles.daynight, styles.night ]: styles.daynight} onPress={() => {
                            setMode("dark")
                            updateUserData()
                        }}>
                            <Ionicons style={mode == "dark" ? [styles.daynight.icon, styles.night.icon ]: styles.daynight.icon} name="ios-moon" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
