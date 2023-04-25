import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { theme, color } from '../../assets/styles/style';
import fetchRoute from '../../Utils/auth';

export default function Register({ data }) {
	const [form, setForm] = useState({
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmed: ''
	});
	const [error, setError] = useState(null);
	const [registered, setRegistered] = useState(false);

	const handleChange = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	const registerUser = async () => {
		setError(null);
		setRegistered(false);

		try {
			if (form.confirmed !== form.password) {
				throw new Error('Les mots de passe sont différents');
			}

			const response = await fetchRoute('user/create', 'POST', {
				username: form.username,
				first_name: form.firstname,
				last_name: form.lastname,
				email: form.email,
				password: form.password
			});

			if (!response.ok) {
				throw new Error(
					`HTTP error: ${response.status} ${response.statusText}`
				);
			}
			const json = await response.json();
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
			backgroundColor: color.primary,
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
				{[
					'username',
					'firstname',
					'lastname',
					'email',
					'password',
					'confirmed'
				].map((field, index) => (
					<TextInput
						key={index}
						style={styles.input}
						onChangeText={(value) => handleChange(field, value)}
						value={form[field]}
						placeholder={
							{
								username: 'Identifiant',
								firstname: 'Prénom',
								lastname: 'Nom de famille',
								email: 'E-mail',
								password: 'Mot de passe',
								confirmed: 'Confirmer le mot de passe'
							}[field]
						}
						secureTextEntry={['password', 'confirmed'].includes(field)}
					/>
				))}
			</View>

			<TouchableOpacity style={styles.btn}>
				<Text style={styles.btnText} onPress={registerUser}>
					S'inscrire
				</Text>
			</TouchableOpacity>
			{error && <Text style={styles.errorText}>{error}</Text>}
			{registered && <Text style={styles.success}>Enregistré</Text>}
		</View>
	);
}
