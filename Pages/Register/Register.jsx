import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import Text from "../../Components/Text";
import { theme, color } from "../../assets/styles/style";
import {fetchFromStorage, fetchRoute} from "../../Utils/auth";
import { UserContext } from "../../Context/UserContext";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";

export default function Register({ data }) {
  const [form, setForm] = useState({
    username: "MarieDubois54",
    firstname: "Marie",
    lastname: "Dubois",
    email: "marie.dubois54000@gmail.com",
    password: "mariedubois",
    confirmed: "mariedubois"
  });
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const userContext = useContext(UserContext);
  const mode = userContext.theme;
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const registerUser = async () => {
    setError(null);
    setRegistered(false);

    try {
      if (form.confirmed !== form.password) {
        throw new Error("Les mots de passe sont différents");
      }
      const response = await fetchRoute("/user/create", "POST", {
        username: form.username,
        first_name: form.firstname,
        last_name: form.lastname,
        email: form.email,
        password: form.password,
        active: true
      });
      if (!response) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
      if(response){
        setRegistered(true);
        console.log("youhou")
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error.message
      );
      setError(error.message);
    }
  };

  const styles = StyleSheet.create({
    content : {
      width: "90%",
      alignSelf: 'center',
      flex: 1
    },
    input: {
      width: "100%",
      height: 40,
      backgroundColor: color[mode].secondaryBackground,
      borderRadius: 32,
      margin: 12,
      marginTop: 16,
      elevation: 5,
      padding: 10
    },
    inputBox: {
      marginTop: 26,
      width: "90%",
    },

    btn: {
      width: 200,
      height: 40,
      borderRadius: 32,
      alignItems: 'center',
    },
    btnText: {
      color: color[mode].light
    },
    cutomInput : {
      marginTop : 16
    },
    bottom : {
      backgroundColor: color[mode].background,
      zIndex: 10,
      width: '100%',
      height: '15%',
      marginTop: 'auto',
      bottom: 0,
      // position: "fixed",
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  });

	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<View style={theme[mode].inputGroup}>
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
						style={[theme[mode].inputGroup.input, styles.cutomInput]}
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
						placeholderTextColor={mode == "dark" ? "#fff" : "#000"}
						secureTextEntry={['password', 'confirmed'].includes(field)}
					/>
				))}
			</View>
      <View style={styles.bottom}>
        <TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={registerUser}>
          <Text style={styles.btnText}>S'inscrire</Text>
        </TouchableOpacity>
        {error &&
          <Text style={styles.errorText}>
            {error}
          </Text>}
        {registered && <Text style={styles.success}>Enregistré</Text>}
      </View>
    </ScrollView>
  );
}
