import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { useNavigation } from '@react-navigation/native';
import Text from "../../../Components/Text";
import {useContext, useState} from 'react';
import {UserContext} from "../../../Context/UserContext";
export default function CreateSensor() {
	// const navigation = useNavigation();
	// const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	// const [space, setSpace] = useState('');
	// const [reference, setReference] = useState('');
	const userContext = useContext(UserContext);
	const mode = userContext.theme

	const styles = StyleSheet.create({
		content : {
			width: "90%",
			alignSelf: "center"
		},
		input: {
			width: '100%',
			margin: 0,
		},
		inputGroup: {
			alignItems: 'flex-start',
			width: '100%',
			marginTop: 24
		},
		label: {
			marginBottom: -10
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
		},
		hidden: {
			display: 'none'
		}
	});

	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Nom</Text>
				<TextInput
					style={[theme[mode].input, styles.input]}
					placeholder="Ex : Home"
					placeholderTextColor={color[mode].text}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Piece</Text>
				<RNPickerSelect
					onValueChange={(value) => setRoom(value)}
					items={[
						{ label: '-Salon-', value: 'Salon' },
						{ label: '-Chambre-', value: 'Chambre' }
					]}
					style={pickerSelectStyles[mode]}
				/>
				<TextInput style={styles.hidden} defaultValue={room} />
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Référence</Text>
				<TextInput
					style={[theme[mode].input, styles.input]}
					placeholder="Référence"
					placeholderTextColor={color[mode].text}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={[theme[mode].btn, styles.btn]}>
					<Text style={theme[mode].btnText}>Créer le capteur</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

