import React, { useContext, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { theme } from '../../assets/styles/style';
import { UserContext } from '../../Context/UserContext';
import fetchRoute from '../../Utils/auth';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [connected, setConnected] = useState(false);
	const userContext = useContext(UserContext);

	const saveUserData = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const loginUser = async (email, password) => {
		try {
			const jsonData = await fetchRoute('auth/login', 'POST', {
				email,
				password
			});

			await saveUserData('userId', JSON.stringify(jsonData.userId));
			await saveUserData('token', JSON.stringify(jsonData.token));

			const userId = await SecureStore.getItemAsync('userId');
			const token = await SecureStore.getItemAsync('token');

			if (userId && token) {
				userContext.setID(userId);
				userContext.setToken(token);
				setConnected(true);
			}
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		}
	};

	const handleLogin = () => {
		setError(null);
		setConnected(false);
		loginUser(email, password);
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
					keyboardType="email-address"
					placeholder="Adresse mail"
				/>

				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder="Mot de passe"
					secureTextEntry
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{connected && <Text style={styles.success}>Connecté</Text>}
			</View>

			<TouchableOpacity style={styles.btn}>
				<Text style={styles.btnText} onPress={handleLogin}>
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
