import React, {useContext, useState} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, pickerSelectStyles, color } from '../assets/styles/style';
import { UserContext } from '../Context/UserContext';

export default function RadioButton({ data, current, onSelect }) {
	const userContext = useContext(UserContext);
	const mode = userContext.theme;

	const selectHandler = (value) => {
		onSelect(value);
		console.log("current : ", current)
	};


	const styles = StyleSheet.create({
		option: {
			fontSize: 20,
			color: 'white',
			textAlign: 'center'
		},
		unselected: {
			borderColor: color[mode].secondaryBackground,
			borderWidth: 4,
			padding: 24,
			paddingLeft: 64,
			paddingRight: 64,
			margin: 5,
			borderRadius: 8,
			marginTop: 8,
		},
		selected: {
			borderColor: color[mode].primary,
			borderWidth: 4,
			padding: 24,
			paddingLeft: 64,
			paddingRight: 64,
			margin: 5,
			borderRadius: 8,
			marginTop: 8,
		},
		btnGroup : {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 16
		}
	});
	return (
		<View style={styles.btnGroup}>
			{data.map((item) => {
				return (
					<Pressable
						style={
							item.value === current ? styles.selected : styles.unselected
						}
						onPress={() => selectHandler(item.value)}
					>
						{item.value == "Celsius"?
							<MaterialCommunityIcons name="temperature-celsius" size={24} color="black" /> :
							<MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="black" />}
					</Pressable>
				);
			})}
		</View>
	);
}
