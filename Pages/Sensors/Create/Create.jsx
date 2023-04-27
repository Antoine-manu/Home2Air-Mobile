import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { UserContext } from '../../../Context/UserContext';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { useState, useEffect, useContext } from 'react';
import { fetchRoute } from '../../../Utils/auth';

export default function CreateSensor() {
	const [name, setName] = useState('');
	const [room, setRoom] = useState(0);
	const [rooms, setRooms] = useState([]);
	const [reference, setReference] = useState('');
	const userContext = useContext(UserContext);

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
		const room_id = room;
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
		console.log('response', response);
	};

	const pickerItems = rooms.map((r) => {
		return { label: `${r.name}`, value: `${r.id}` };
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Nom</Text>
				<TextInput
					style={[theme.input, styles.input]}
					placeholder="Ex : Home"
					onChangeText={setName}
					value={name}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Piece</Text>
				<RNPickerSelect
					onValueChange={(value) => setRoom(value)}
					items={pickerItems}
					style={pickerSelectStyles}
				/>
				<TextInput
					style={styles.hidden}
					defaultValue={toString(room)}
					value={room}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Référence</Text>
				<TextInput
					style={[theme.input, styles.input]}
					placeholder="Référence"
					onChangeText={setReference}
					value={reference}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={[theme.btn, styles.btn]}>
					<Text style={theme.btnText} onPress={createSensor}>
						Créer le capteur
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
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
	container: {
		width: '80%',
		marginLeft: '10%',
		alignItems: 'center',
		flex: 1
	},
	bottom: {
		backgroundColor: color.background,
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
