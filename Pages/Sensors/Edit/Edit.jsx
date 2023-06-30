import { useState, useContext, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { fetchRoute } from '../../../Utils/auth';
import { UserContext } from '../../../Context/UserContext';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	Switch,
	ScrollView
} from 'react-native';
import Text from '../../../Components/Text';
import Select from '../../../Components/Select';
import RadioButton from '../../../Components/Radio';

export default function EditSensor({ navigation, route }) {
	const { id } = route.params;
	const [name, setName] = useState('');
	const [room, setRoom] = useState({});
	const [params, setParams] = useState({});
	const [rooms, setRooms] = useState([]);
	const [temperature, setTemperature] = useState('');
	const [select, setSelect] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleted, setIsDeleted] = useState(false);
	const data = [{ value: 'Celsius' }, { value: 'Fahrenheit' }];
	const userContext = useContext(UserContext);
	const mode = userContext.theme;
	console.log("temp : ", isEnabled)
	const toggleSwitch = () => setIsEnabled((isEnabled) => !isEnabled);
	const styles = StyleSheet.create({
		content: {
			width: '90%',
			alignSelf: 'center',
			flex: 1
		},
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
			height : 50,
			marginTop: 20,
			backgroundColor: color[mode].secondaryBackground,
			padding: 12,
			borderRadius: 8
		},
		temp: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			height : 50,
			borderRadius: 8
		},
		label: {
			color: color[mode].text
		},
		switchGroup: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 20
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
			alignItems: 'center',
			backgroundColor: color[mode].red
		},
		btnText: {
			color: color[mode].light
		},
		hidden: {
			display: 'none'
		},
		title: {
			fontSize: 16,
			fontWeight: 'bold',
			alignSelf: 'flex-start',
			marginTop: 24
		},
		select : {
			borderRadius: 8,
			marginTop: 8
		}
	});
	const selectStyle = {
		inputIOS: {
			placeholder: {
				color: color[mode].text
			},
			color: color[mode].text
		},
		inputAndroid: {
			placeholder: {
				color: color[mode].text
			},
			color: color[mode].text
		}
	};
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
			if (response) {
				const parameters = JSON.parse(response.parameters);

				const r = await findMonitoredRoom(response.room_id);
				setName(response.name);
				setRoom(r);
				setSelect(r);
				setParams(parameters);
				setTemperature(parameters.temperature);
				setIsEnabled(parameters.notifications);
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const updateSensorData = async (key, value) => {
		const parameters = {
			notifications: isEnabled,
			advanced: '',
			temperature: temperature
		};
		for (const param in parameters) {
			if (key == param) {
				parameters[key] = value;
			}
		}
		const inputs = {
			name: name,
			room_id: select.id,
			createdBy: userContext.userId,
			parameters: JSON.stringify(parameters),
			updatedAt: getCurrentDate(),
			active: true
		};

		for (const input in inputs) {
			if (key == input) {
				inputs[key] = value.value ? value.value : value;
			}
		}

		const response = await fetchRoute(
			`sensor/update/${id}`,
			'post',
			inputs,
			userContext.token
		);
	};

	const deleteSensor = async () => {
		const inputs = {
			deleted_at: 1
		};
		const response = await fetchRoute(
			`sensor/update/${id}`,
			'post',
			inputs,
			userContext.token
		);
		if(response){
			navigation.goBack()
		}
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
	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<Text style={styles.title}>Informations</Text>
			<View style={theme[mode].inputGroup}>
				<Text style={theme[mode].inputGroup.label}>Nom</Text>
				<TextInput
					style={theme[mode].inputGroup.input}
					placeholder="Ex : Home"
					defaultValue={name}
					onChangeText={(value) => {
						setName(value);
						updateSensorData('name', value);
					}}
				/>
			</View>
			<View style={theme[mode].inputGroup}>
				<Text style={theme[mode].inputGroup.label}>Pièce</Text>
				<Select
					data={pickerItems}
					style={[theme[mode].inputGroup.input, styles.select]}
					onSelect={(value) => {
						setSelect(value);
						updateSensorData('room_id', value);
					}}
					defaultValue={select.name}
				/>
			</View>
			<Text style={styles.title}>Paramètres de temperature</Text>
			<View>
				<RadioButton
					data={data}
					value={temperature}
					current ={temperature}
					onSelect={(value) => {
						setTemperature(value);
						updateSensorData('temperature', value);
					}}
				/>
			</View>
			<Text style={styles.title}>Notifications</Text>
			<View style={styles.switchGroup}>
				<Text>Notifications du capteur</Text>
				<Switch
					trackColor={{ false: color[mode].grey, true: color[mode].blue }}
					thumbColor={isEnabled ? color[mode].light : color[mode].light}
					onValueChange={() => {
						toggleSwitch();
						updateSensorData();
					}}
					value={isEnabled}
				/>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={[theme[mode].btn, styles.btn]}
								  onPress={() => {
									  deleteSensor();
									  setIsDeleted(true);
								  }}>
					<Text style={styles.btnText}> Supprimer </Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
