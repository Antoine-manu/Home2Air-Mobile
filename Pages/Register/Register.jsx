import React, {useContext, useState} from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity, ScrollView
} from 'react-native';
import { theme, color } from '../../assets/styles/style';
import fetchRoute from '../../Utils/auth';
import {UserContext} from "../../Context/UserContext";
import Text from "../../Components/Text";

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
	const userContext = useContext(UserContext);
	const mode = userContext.theme

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
		input: {
			width: 300,
			height: 40,
			backgroundColor: color[mode].secondaryBackground,
			borderRadius: 32,
			margin: 12,
			marginTop: 16,
			paddingLeft: 18,
			elevation: 5,
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
			color: '#FFFFFF'
		}
	});

	return (
		<ScrollView contentContainerStyle={theme[mode].container}>
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
						style={theme[mode].input}
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
						placeholderTextColor={mode == 'dark' ? '#000' : '#fff'}
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
		</ScrollView>
	);
}
