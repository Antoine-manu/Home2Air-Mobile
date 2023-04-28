import { useState, useContext, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Switch
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { fetchRoute } from '../../../Utils/auth';
import { UserContext } from '../../../Context/UserContext';

export default function EditSensor({ route }) {
	const { id } = route.params;
	const [name, setName] = useState('');
	const [edited, setEdited] = useState('');
	const [room, setRoom] = useState({});
	const [params, setParams] = useState({});
	const [rooms, setRooms] = useState([]);
	const [temperature, setTemperature] = useState('Celsius');
	const [select, setSelect] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const userContext = useContext(UserContext);

	useEffect(() => {
		findSensorData();
		getAllRooms();
	}, []);

	const getAllRooms = async () => {
		const r = await fetchRoute('room/find-all', 'post', {}, userContext.token);
		setRooms(r);
	};

	const getCurrentDate = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		return `${year}-${month.toString().padStart(2, '0')}-${day
			.toString()
			.padStart(2, '0')}`;
	};

	const findSensorData = async () => {
		try {
			const response = await fetchRoute(
				'sensor/find-one-by-id',
				'post',
				{ id },
				userContext.token
			);
			const parameters = JSON.parse(response.parameters);
			const r = await findMonitoredRoom(response.room_id);
			console.log('r', r);
			setName(response.name);
			setRoom(r);
			setSelect(r.id);
			setParams(parameters);
			setTemperature(parameters.temperature);
			setIsEnabled(parameters.notifications);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const updateSensorData = async () => {
		const parameters = {
			notifications: isEnabled,
			advanced: '',
			temperature: temperature
		};
		console.log(
			'params',
			`sensor/update/${id}`,
			'post',
			{
				name: name,
				room_id: select,
				createdBy: userContext.userId,
				parameters,
				updatedAt: getCurrentDate(),
				active: true
			},
			userContext.token
		);
		const response = await fetchRoute(
			`sensor/update/${id}`,
			'post',
			{
				name: name,
				room: select,
				createdBy: userContext.userId,
				parameters,
				updatedAt: getCurrentDate(),
				active: true
			},
			userContext.token
		);
	};

	const findMonitoredRoom = async (id) => {
		const response = await fetchRoute(
			'room/find-one-by-id/',
			'post',
			{ id },
			userContext.token
		);
		return response;
	};

	const pickerItems = rooms.map((r) => {
		return { label: `${r.name}`, value: `${r.id}` };
	});
	console.log('select', select);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Informations</Text>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Nom</Text>
				<TextInput
					style={styles.input}
					placeholder="Ex : Home"
					defaultValue={name}
					onChangeText={(value) => {
						setName(value);
						updateSensorData(); // call updateSensorData with the new value
					}}
				/>
			</View>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Pièce</Text>
				<RNPickerSelect
					onValueChange={(value) => {
						setSelect(value);
						updateSensorData(); // call updateSensorData with the new value
					}}
					items={pickerItems}
					style={pickerSelectStyles}
					value={select}
				/>
				<TextInput
					style={styles.hidden}
					defaultValue={toString(room)}
					value={room}
					onValueChange={updateSensorData}
				/>
				{select && <Text>{room.name}</Text>}
			</View>

			{/* <View style={styles.inputGroup}>
				<Text style={styles.label}>Référence</Text>
				<TextInput placeholder="Référence" defaultValue={reference} />
			</View> */}
			<Text style={styles.title}>Paramètres généraux</Text>
			{/* <View style={styles.inputGroup}>
				<Text style={styles.label}>Temperature</Text>
				<RNPickerSelect
					value={temperature}
					onValueChange={(value) => {
						setTemperature(value);
						updateSensorData();
					}}
					items={[
						{ label: 'Celsius', value: 'Celsius' },
						{ label: 'Fahrenheit', value: 'Fahrenheit' }
					]}
				/>
			</View> */}
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Temperature</Text>
				<RNPickerSelect
					onValueChange={(value) => {
						setTemperature(value);
						updateSensorData(); // call updateSensorData with the new value
					}}
					items={[
						{ label: 'Celsius', value: 'Celsius' },
						{ label: 'Fahrenheit', value: 'Fahrenheit' }
					]}
					style={pickerSelectStyles}
					value={params.temperature}
				/>
				<TextInput
					style={styles.hidden}
					defaultValue={params.temperature}
					value={params.temperature}
					onValueChange={updateSensorData}
				/>
				{select && <Text>{temperature}</Text>}
			</View>
			<Text style={styles.title}>Notifications</Text>
			<View style={styles.switchGroup}>
				<Text>Notifications du capteur</Text>
				<Switch
					trackColor={{ false: color.grey, true: color.blue }}
					thumbColor={isEnabled ? color.light : color.light}
					ios_backgroundColor="#3e3e3e"
					onValueChange={(setIsEnabled, updateSensorData())}
					value={isEnabled}
					defaultValue={isEnabled}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={[theme.btn, styles.btn]}>
					<Text style={theme.btnText}>Supprimer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		alignItems: 'center',
		borderRadius: 32,
		margin: 0,
		width: '80%',
		textAlign: 'right'
	},
	inputGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20,
		backgroundColor: color.lightgrey,
		padding: 12,
		borderRadius: 8
	},
	switchGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20
	},
	label: {
		marginBottom: -10
	},
	container: {
		width: '90%',
		marginLeft: '5%',
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
		alignItems: 'center',
		backgroundColor: color.red
	},
	hidden: {
		display: 'none'
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		marginTop: 24
	}
});
