import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Button,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { theme, color } from '../../assets/styles/style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../../Components/Text';
import { FontAwesome5 } from '@expo/vector-icons';
import SmallSensor from '../../Components/smallSensor';
import { UserContext } from '../../Context/UserContext';
import { useState, useContext, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
export default function Home() {
	const navigation = useNavigation();
	const userContext = useContext(UserContext);
	const mode = userContext.theme;
	const [place, setPlace] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [sensors, setSensors] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState(null); // Add a state variable for search results

	const styles = StyleSheet.create({
		content: {
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

	useEffect(() => {
		async function fetchData() {
			setPlace(await renderSensorList());
		}
		fetchData();
		console.log(place);
	}, []);

	const renderSensorList = async () => {
		console.log(
			JSON.stringify(
				await fetchRoute(
					'place/find-room-and-sensor',
					'post',
					{
						user_id: userContext.userId
					},
					userContext.token
				),
				null,
				2
			)
		);
		return await fetchRoute(
			'place/find-room-and-sensor',
			'post',
			{
				user_id: userContext.userId
			},
			userContext.token
		);
	};

	const searchSensors = async (search) => {
		if (search.length > 0) {
			const response = await fetchRoute(
				'sensor/find-by',
				'post',
				{ name: search },
				userContext.token
			);
			if (response) {
				setSearchResults(response); // Store the search results in state
			}
		}
	};

	// Define a function to render a SmallSensor component for each sensor in the search results
	const renderSearchResults = () => {
		if (searchResults) {
			console.log(
				searchResults.map((sensor) => ({
					id: sensor.id,
					name: sensor.name,
					randomInt: Math.floor(Math.random() * 100) + 1
				}))
			);
			return searchResults.map((sensor) => (
				<SmallSensor id={sensor.id} name={sensor.name} /> // Pass the name prop to SmallSensor
			));
		}
		return null;
	};

	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<View style={styles.header.container}>
				<Text style={styles.header.title}>-Space-</Text>
				<View style={styles.header.right.layout}>
					<FontAwesome5 name="bell" size={24} color={color[mode].primary} />
					<TouchableOpacity onPress={() => navigation.navigate('Profil')}>
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
				onChangeText={(text) => {
					searchSensors(text);
				}}
				placeholderTextColor={mode == 'dark' ? '#000' : '#fff'}
			/>
			<View style={styles.sensors}>
				{searchResults
					? renderSearchResults()
					: place.map((place) => (
							<View key={place.id}>
								<Text style={styles.sensors.title}>{place.name}</Text>
								<Text style={styles.sensors.underText}>
									-
									{place.Room.reduce(
										(sum, room) => sum + room.Sensor.length,
										0
									)}
									- capteurs
								</Text>
								{place.Room.map((room) => (
									<View key={room.id}>
										<Text>{room.name}</Text>
										{room.Sensor.map((sensor) => (
											<SmallSensor
												key={sensor.id}
												id={sensor.id}
												name={sensor.name}
											/>
										))}
									</View>
								))}
							</View>
					  ))}
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
