import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	ScrollView,
	TouchableOpacity, Alert
} from 'react-native';
import { theme, color } from '../../assets/styles/style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from "../../Components/Text";
import { FontAwesome5 } from '@expo/vector-icons';
import SmallSensor from '../../Components/smallSensor';
import {UserContext} from "../../Context/UserContext";
import {useContext} from "react";
export default function Home() {
	const navigation = useNavigation();
	const userContext = useContext(UserContext);
	const mode = userContext.theme

	const styles = StyleSheet.create({
		content : {
			marginTop: 48
		},
		header: {
			title: {
				fontSize: 20,
				fontWeight: 'bold'
			},
			container: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: 350
			},
			right: {
				layout: {
					flexDirection: 'row',
					alignItems: 'center',
					width: 100,
					justifyContent: 'space-between'
				},
				pp: {
					width: 50,
					height: 50,
					borderRadius: 50
				}
			}
		},
		input: {
			width: 350
		},
		sensors: {
			alignItems: 'center',
			title: {
				marginTop: 24,
				fontSize: 20,
				fontWeight: 'bold'
			},
			underText: {
				marginTop: 6,
				marginBottom: 20,
				color: color[mode].darkgrey
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
		btn: {
			width: 250,
			alignItems: 'center'
		}
	});



	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<View style={styles.header.container}>
				<Text style={styles.header.title}>-Space-</Text>
				<View style={styles.header.right.layout}>
					<TouchableOpacity>
						<FontAwesome5 name="bell" size={24} color={color[mode].primary} onPress={() => navigation.navigate('Notifications')}/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('Profil')}
					>
						<Image
							style={styles.header.right.pp}
							source={require('../../assets/pp.jpeg')}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<TextInput
				style={[theme[mode].input, styles.input]}
				placeholder="Chercher un capteur"
				placeholderTextColor= {color[mode].textSecondary}
			/>
			<View style={styles.sensors}>
				<Text style={styles.sensors.title}>-Room-</Text>
				<Text style={styles.sensors.underText}>-X- capteurs</Text>
				<SmallSensor />
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity
					style={[theme[mode].btn, styles.btn]}
					onPress={() => navigation.navigate('CreateSensor')}
				>
					<Text style={theme[mode].btnText}>Créer un capteur</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
