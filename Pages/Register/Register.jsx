import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../assets/styles/style';
export default function Register({ data }) {
	const [username, setUsername] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmed, setConfirmed] = useState('');
	const [error, setError] = useState(null);
	const [registered, setRegistered] = useState(false);

	const fetchWithTimeout = (resource, options, timeout = 5000) => {
		return Promise.race([
			fetch(resource, options),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Request timed out')), timeout)
			)
		]);
	};

	const registerTest = async () => {
		setError(null);
		setRegistered(false);

		try {
			if (confirmed != password) {
				throw new Error('Les mots de passe sont différents');
			}
			// const hash = crypto.createHash('sha256');
			// hash.update(password);
			// const hashedPassword = hash.digest('hex');
			const response = await fetchWithTimeout(
				'http://192.168.1.237:6500/user/create',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: username,
						first_name: firstname,
						last_name: lastname,
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
			// setJsonData(json);
			// AsyncStorage.setItem('token', jsonData.token);
			// AsyncStorage.setItem('userId', JSON.stringify(jsonData.userId));
			// Handle the response, e.g., navigate to another screen
			setRegistered(true);
		} catch (error) {
			console.error(
				'There has been a problem with your fetch operation:',
				error.message
			);
			setError(error.message);
		}
	};

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			flex: 1
		},
		input: {
			width: 300,
			height: 40,
			backgroundColor: '#f7f7f7',
			borderRadius: 32,
			margin: 12,
			marginTop: 16,
			paddingLeft: 18,
			elevation: 5,
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
		}
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputBox}>
				<TextInput
					style={styles.input}
					onChangeText={setUsername}
					value={username}
					placeholder="Identifiant"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setFirstName}
					value={firstname}
					placeholder="Prénom"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setLastName}
					value={lastname}
					placeholder="Nom de famille"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					value={email}
					placeholder="E-mail"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder="Mot de passe"
					secureTextEntry
				/>
				<TextInput
					style={styles.input}
					onChangeText={setConfirmed}
					value={confirmed}
					placeholder="Confirmer le mot de passe"
					secureTextEntry
				/>
			</View>

			<TouchableOpacity style={styles.btn}>
				<Text style={styles.btnText} onPress={registerTest}>
					S'inscrire
				</Text>
			</TouchableOpacity>
			{error && <Text style={styles.errorText}>{error}</Text>}
			{registered && <Text style={styles.success}>Enregistré</Text>}
		</View>
	);
}
