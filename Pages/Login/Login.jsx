import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import crypto from 'crypto';
import {
	Alert,
	View,
	Image,
	SafeAreaView,
	TextInput,
	Button,
	Text,
	StyleSheet
} from 'react-native';

export default function Home({ data }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [connected, setConnected] = useState(false);
	const [jsonData, setJsonData] = useState({});

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
			AsyncStorage.setItem('token', jsonData.token);
			AsyncStorage.setItem('userId', jsonData.userId.toString());
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
			width: 400,
			height: 60
		},
		container: {},
		input: {
			height: 40,
			margin: 12,
			borderWidth: 1,
			padding: 10
		},
		errorText: {
			color: 'red',
			margin: 12
		},
		success: {
			color: 'green',
			margin: 12
		}
	});

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				resizeMode={'contain'}
				source={require('../../assets/logo.png')}
			/>
			<SafeAreaView>
				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					value={email}
					placeholder="email"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder="password"
					secureTextEntry
				/>
				<Button
					onPress={loginTest}
					title="Se connecter"
					color="#841584"
					accessibilityLabel="Connexion"
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{connected && <Text style={styles.success}>Connecté</Text>}
			</SafeAreaView>
		</View>
	);
}
