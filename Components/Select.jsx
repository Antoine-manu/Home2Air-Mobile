import React, { useRef, useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	Modal
} from 'react-native';
import { Icon } from '@rneui/themed';

const Select = ({ _label, data, onSelect, _selected, defaultValue }) => {
	const selectButtonRef = useRef(null);
	const [label, setLabel] = useState(_label);
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(_selected);
	const [_default, setDefault] = useState(defaultValue);
	const [dropdownTop, setDropdownTop] = useState(0);

	useEffect(() => {
		setSelected(selected);
		setDefault(defaultValue);
	}, [selected]);

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
				{!selected
					? _default
					: (selected && `${selected.label} (${selected.value})`) || _default}
			</Text>
			<Icon style={styles.icon} type="font-awesome" name="chevron-down" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#efefef',
		height: 50,
		zIndex: 1
	},
	buttonText: {
		flex: 1,
		textAlign: 'center'
	},
	icon: {
		marginRight: 10
	},
	dropdown: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: '100%',
		shadowColor: '#000000',
		shadowRadius: 4,
		shadowOffset: { height: 4, width: 0 },
		shadowOpacity: 0.5
	},
	overlay: {
		width: '100%',
		height: '100%'
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1
	}
});

export default Select;
