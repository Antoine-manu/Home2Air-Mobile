import { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import RNPickerSelect from '@react-native-picker/picker';
import { UserContext } from '../../../Context/UserContext';
import Text from '../../../Components/Text';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { fetchRoute } from '../../../Utils/auth';
import Select from "../../../Components/Select";
import {useNavigation} from "@react-navigation/native";

export default function CreateSensor() {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [room, setRoom] = useState(0);
	const [rooms, setRooms] = useState([]);
	const [reference, setReference] = useState('');
	const userContext = useContext(UserContext);
	const mode = userContext.theme;

	const getAllRooms = async () => {
		// const tk = ;
		const r = await fetchRoute('room/find-all', 'post', {}, userContext.token);
		setRooms(r);
	};

	useEffect(() => {
		getAllRooms();
	}, []);

	const createSensor = async () => {
		const createdBy = `${userContext.userId}`;
		const room_id = room.value;
		const jsonData = {
			name,
			room_id,
			reference,
			createdBy
		};
		const response = await fetchRoute(
			'sensor/create',
			'POST',
			jsonData,
			userContext.token
		);
		if(response){
			navigation.navigate("Home")
		}
	};

	const pickerItems = rooms.map((r) => {
		return { label: `${r.name}`, value: `${r.id}` };
	});
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
					placeholderTextColor={color[mode].textSecondary}
					onChangeText={setName}
					value={name}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Pièce</Text>
				<Select
					label="Sélectionnez une option"
					data={pickerItems}
					onSelect={(value) => setRoom(value)}
					style={pickerSelectStyles[mode]}
				/>
				<TextInput
					style={styles.hidden}
					defaultValue={toString(room)}
					value={room}
					placeholderTextColor={color[mode].textSecondary}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Référence</Text>
				<TextInput
					style={[theme[mode].input, styles.input]}
					placeholder="Référence"
					onChangeText={setReference}
					value={reference}
					placeholderTextColor={color[mode].textSecondary}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={createSensor}>
					<Text style={theme[mode].btnText}>
						Créer le capteur
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
