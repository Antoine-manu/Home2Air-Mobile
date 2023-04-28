import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';
import { theme, color } from '../../assets/styles/style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import SmallSensor from '../../Components/smallSensor';
import { UserContext } from '../../Context/UserContext';
import { useState, useContext } from 'react';
import { fetchRoute } from '../../Utils/auth';
export default function Home() {
	const navigation = useNavigation();

	const [sensors, setSensors] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState(null); // Add a state variable for search results
	const userContext = useContext(UserContext);

	const searchSensors = async (name) => {
		console.log(name);
		const response = await fetchRoute(
			'sensor/find-by',
			'post',
			{ name },
			userContext.token
		);
		console.log(response);
		setSearchResults(response); // Store the search results in state
	};

	// Define a function to render a SmallSensor component for each sensor in the search results
	const renderSearchResults = () => {
		if (searchResults) {
			return searchResults.map((sensor) => (
				<SmallSensor id={sensor.id} name={sensor.name} /> // Pass the name prop to SmallSensor
			));
		}
		return null;
	};

	return (
		<View style={styles.container}>
			<View style={styles.header.container}>
				<Text style={styles.header.title}>-Space-</Text>
				<View style={styles.header.right.layout}>
					<FontAwesome5 name="bell" size={24} color={color.primary} />
					<Image
						style={styles.header.right.pp}
						source={require('../../assets/pp.jpeg')}
					/>
				</View>
			</View>
			<TextInput
				style={[theme.input, styles.input]}
				placeholder="Chercher un capteur"
				onChangeText={(text) => {
					setSearch(text);
					searchSensors(text);
				}}
				value={search}
			/>
			<View style={styles.sensors}>
				<Text style={styles.sensors.title}>-Room-</Text>
				<Text style={styles.sensors.underText}>
					-{searchResults ? searchResults.length : sensors.length}- capteurs
				</Text>
				{searchResults? renderSearchResults() : ''}
					{/* // : searchResults.map(
					// 		(sensor) => (
								
					// 			(<SmallSensor id={sensor.id} name={sensor.name} />)
					// 		)
					//   )
					//   } */}
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity
					style={[theme.btn, styles.btn]}
					onPress={() => navigation.navigate('CreateSensor')}
				>
					<Text style={theme.btnText}>Créer un capteur</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		alignItems: 'center',
		flex: 1
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
			color: color.darkgrey
		}
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
	}
});
