import React, { useContext, useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity, ScrollView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Text from "../../Components/Text";
import { theme, color } from '../../assets/styles/style';
import { UserContext } from '../../Context/UserContext';
import { fetchFromStorage, fetchRoute } from '../../Utils/auth';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('Daveloper@test.com');
	const [password, setPassword] = useState('test');
	const [error, setError] = useState(null);
	const [connected, setConnected] = useState(false);
	const userContext = useContext(UserContext);
	const mode = userContext.theme

	const saveUserData = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const loginUser = async () => {
		try {
			const jsonData = await fetchRoute('auth/login', 'POST', {
				email,
				password
			});
			 (jsonData);
			if (jsonData.userId && jsonData.token) {
				await saveUserData('userId', JSON.stringify(jsonData.userId));
				await saveUserData('token', JSON.stringify(jsonData.token));
				userContext.setUserId(jsonData.userId);
				userContext.setToken(jsonData.token);
				setConnected(true);
			}
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		}
	};

	const handleLogin = () => {
		setError(null);
		async () => {
			const t = fetchFromStorage('token');
			const uid = fetchFromStorage('userId');
			userContext.setUserId(uid);
			userContext.setToken(t);
		};
		setConnected(false);
		if (!userContext.token || !userContext.userId) {
			loginUser();
		} // modify this line to remove email and password argument
	};

	const styles = StyleSheet.create({
		content : {
			marginTop: 80
		},
		logo: {
			width: 380,
			height: 60
		},
		text: {
			marginTop: 30,
			fontSize: 16,
			fontWeight: 'bold'
		},
		input: {
			width: 300,
			height: 40,
			backgroundColor: color[mode].secondaryBackground,
			borderRadius: 32,
			margin: 12,
			marginTop: 16,
			elevation: 5,
			paddingLeft: 18,
			padding: 10
		},
		inputBox: {
			marginTop: 26
		},
		btn: {
			marginTop: 24,
			backgroundColor: color[mode].primary,
			padding: 12,
			paddingLeft: 48,
			paddingRight: 48,
			borderRadius: 32
		},
		btnText: {
			color: color[mode].light
		},
		forgetpassword: {
			marginTop: 16
		},
		forgetpasswordText: {
			color: color[mode].primary
		},
		add: {
			marginTop: 'auto',
			bottom: 40,
			flexDirection: 'row'
		},
		addText: {
			color: color[mode].primary
		}
	});

	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<Image
				style={styles.logo}
				resizeMode={'contain'}
				source={require('../../assets/logo.png')}
			/>
			<Text style={styles.text}>Se connecter pour continuer</Text>
			<View style={styles.inputBox}>
				<TextInput
					style={theme[mode].input}
					onChangeText={setEmail}
					value={email}
					keyboardType="email-address"
					placeholder="Adresse mail"
					placeholderTextColor={color[mode].text}
				/>

				<TextInput
					style={theme[mode].input}
					onChangeText={setPassword}
					value={password}
					placeholder="Mot de passe"
					secureTextEntry
					placeholderTextColor={color[mode].text}
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{connected && <Text style={styles.success}>Connecté</Text>}
			</View>

			<TouchableOpacity style={styles.btn} onPress={handleLogin}>
				<Text style={styles.btnText}>Se connecter</Text>
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
		</ScrollView>
	);
}
