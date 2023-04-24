import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../assets/styles/style';
import {UserContext} from "../../Context/UserContext";
export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [connected, setConnected] = useState(false);
	const [jsonData, setJsonData] = useState({});
	const userContext = useContext(UserContext);
	console.log(userContext)

	const fetchWithTimeout = (resource, options, timeout = 5000) => {
		return Promise.race([
			fetch(resource, options),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Request timed out')), timeout)
			)
		]);
	};

	const loginTest = async () => {
		setError(null);
		setConnected(false);

		try {
			// const hash = crypto.createHash('sha256');
			// hash.update(password);
			// const hashedPassword = hash.digest('hex');
			const response = await fetchWithTimeout(
				'http://192.168.1.237:6500/auth/login',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}
			);

			if (!response.ok) {
				throw new Error(
					`HTTP error: ${response.status} ${response.statusText}`
				);
			}
			console.log('ok');
			const json = await response.json();
			setJsonData(json);
			userContext.setToken(jsonData.token);
			userContext.setID(JSON.stringify(jsonData.userId));
			// Handle the response, e.g., navigate to another screen
			setConnected(true);
		} catch (error) {
			console.error(
				'There has been a problem with your fetch operation:',
				error.message
			);
			setError(error.message);
		}
	};
	const styles = StyleSheet.create({
		logo: {
			width: 380,
			height: 60
		},
		container: {
			marginTop: 120,
			alignItems: 'center',
			flex: 1
		},
		text: {
			marginTop: 30,
			fontSize: 16,
			fontWeight: 'bold'
		},
		input: {
			width: 300,
			height: 40,
			backgroundColor: '#f7f7f7',
			borderRadius: 32,
			margin: 12,
			marginTop: 16,
			elevation: 5,
			paddingLeft: 18,
			shadowColor: 'black',
			shadowOffset: {
				width: 6,
				height: 6
			},
			shadowOpacity: 0.1,
			shadowRadius: 8,
			padding: 10
		},
		inputBox: {
			marginTop: 26
		},
		btn: {
			marginTop: 24,
			backgroundColor: theme.primary,
			padding: 12,
			paddingLeft: 48,
			paddingRight: 48,
			borderRadius: 32
		},
		btnText: {
			color: '#FFFFFF'
		},
		forgetpassword: {
			marginTop: 16
		},
		forgetpasswordText: {
			color: theme.primary
		},
		add: {
			marginTop: 'auto',
			bottom: 40,
			flexDirection: 'row'
		},
		addText: {
			color: theme.primary
		}
	});

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				resizeMode={'contain'}
				source={require('../../assets/logo.png')}
			/>
			<Text style={styles.text}>Se connecter pour continuer</Text>
			<View style={styles.inputBox}>
				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					value={email}
					placeholder="Identifiant"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder="Mot de passe"
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{connected && <Text style={styles.success}>Connecté</Text>}
			</View>

			<TouchableOpacity style={styles.btn}>
				<Text style={styles.btnText} onPress={loginTest}>
					Se connecter
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.forgetpassword}>
				<Text style={styles.forgetpasswordText}>Mot de passe oublié ?</Text>
			</TouchableOpacity>

			<View style={styles.add}>
				<Text style="">Vous n'avez pas encore de compte ? </Text>
				<TouchableOpacity
					style=""
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={styles.addText}>Inscrivez vous</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
