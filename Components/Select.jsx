import React, {useRef, useState, useEffect, useContext} from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	Modal
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import { theme, color } from '../assets/styles/style';
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../Context/UserContext";

const Select = ({ _label, data, onSelect, _selected, defaultValue }) => {
	const navigation = useNavigation();
	const userContext = useContext(UserContext);
	const mode = userContext.theme;
	const selectButtonRef = useRef(null);
	const [label, setLabel] = useState(_label);
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(_selected);
	const [_default, setDefault] = useState(defaultValue);
	const [dropdownTop, setDropdownTop] = useState(0);

	const styles = StyleSheet.create({
		button: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: color[mode].secondaryBackground,
			height: 40,
			paddingLeft: 12,
			zIndex: 1
		},
		buttonText: {
			/*flex: 1,
			textAlign: 'center'*/
		},
		dropdown: {
			position: 'absolute',
			backgroundColor: color[mode].secondaryBackground,
			width: '100%',
			shadowColor: '#464646',
			shadowRadius: 4,
			shadowOffset: { height: 4, width: 0 },
			shadowOpacity: 0.3
		},
		overlay: {
			marginLeft: '5%',
			width: '90%',
			height: '100%'
		},
		item: {
			paddingHorizontal: 10,
			paddingVertical: 10,
		}
	});


	useEffect(() => {
		setSelected(selected);
		setDefault(defaultValue);
	}, [defaultValue]);

	const toggleDropdown = () => {
		visible ? setVisible(false) : openDropdown();
	};

	const openDropdown = () => {
		selectButtonRef.current.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + h);
		});
		setVisible(true);
	};

	const onItemPress = (item) => {
		setSelected(item);
		onSelect(item);
		setVisible(false);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
			<Text>{item.label}</Text>
		</TouchableOpacity>
	);

	const renderDropdown = () => (
		<Modal visible={visible} transparent animationType="none">
			<TouchableOpacity
				style={styles.overlay}
				onPress={() => setVisible(false)}
			>
				<View style={[styles.dropdown, { top: dropdownTop }]}>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(data) => data.value} // Updated keyExtractor
					/>
				</View>
			</TouchableOpacity>
		</Modal>
	);

	return (
		<TouchableOpacity
			ref={selectButtonRef}
			style={styles.button}
			onPress={toggleDropdown}
		>
			{renderDropdown()}
			<Text style={styles.buttonText}>
				{selected
					? selected && `${selected.label}`
					: _default}
			</Text>
			<Entypo style={styles.icon} name="chevron-small-down" size={24} color="black" />
		</TouchableOpacity>
	);
};

export default Select;
