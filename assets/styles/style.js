export const color = {
	dark: {
		primary: '#036DDF',
		red: '#E54E4E',
		redSecondary: '#d08686',
		blue: '#036DDF',
		yellow: '#ffcc00',
		green: '#00A67F',
		purple: '#56459E',
		light: '#ffffff',
		black: '#000',
		lightgrey: '#e7e7e7',
		grey: '#DADADA',
		darkgrey: '#A7A7A7',
		darkblue: '#000329',
		background: '#000',
		text: '#FFF',
		secondaryBackground: '#2d2d2d',
		textSecondary: '#A7A7A7',
		modalBg: '#212121',
		backgroundHeader: '#2c2c2c'
	},
	light: {
		primary: '#036DDF',
		red: '#E54E4E',
		redSecondary: '#d08686',
		blue: '#036DDF',
		yellow: '#ffcc00',
		green: '#00A67F',
		purple: '#56459E',
		light: '#ffffff',
		black: '#000',
		lightgrey: '#e7e7e7',
		grey: '#DADADA',
		darkgrey: '#A7A7A7',
		darkblue: '#000329',
		background: '#F5F5F5',
		text: '#000',
		secondaryBackground: '#efefef',
		modalBg: '#f6f6f6',
		textSecondary: '#4d4d4d'
	}
};

export const theme = {
	dark: {
		input: {
			width: 300,
			height: 40,
			backgroundColor: color.dark.secondaryBackground,
			borderRadius: 12,
			margin: 12,
			marginTop: 16,
			elevation: 5,
			paddingLeft: 18,
			padding: 10,
			color: color.dark.text
			// placeholder : {
			//     color : color.dark.text
			// },
		},
		btn: {
			marginTop: 24,
			backgroundColor: color.dark.primary,
			padding: 12,
			paddingLeft: 48,
			paddingRight: 48,
			borderRadius: 32
		},
		btnText: {
			color: '#FFFFFF'
		},
		shadow: {},
		container: {
			width: '100%',
			alignItems: 'center',
			marginTop: 0,
			flex: 1
		},
		inputGroup: {
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 20,
			marginBottom: 16,
			borderRadius: 8,
			height: 50,
			fontWeight: "bold",
			input: {
				alignItems: 'center',
				color: color.dark.textSecondary,
				backgroundColor: color.dark.secondaryBackground,
				borderRadius: 8,
				margin: 0,
				paddingLeft: 12,
				marginTop: 8,
				height: 40,
				textAlign: 'left'
			},
			inputDisable: {
				backgroundColor: color.dark.grey,
				alignItems: 'center',
				color: color.dark.textSecondary,
				borderRadius: 8,
				margin: 0,
				paddingLeft: 12,
				marginTop: 8,
				height: 40,
				textAlign: 'left'
			}
		},
		inputGroupDisable: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 20,
			backgroundColor: '#1a1a1a',
			padding: 12,
			borderRadius: 8
		}
	},
	light: {
		input: {
			width: 300,
			height: 40,
			backgroundColor: color.light.secondaryBackground,
			borderRadius: 12,
			margin: 12,
			marginTop: 16,
			elevation: 5,
			paddingLeft: 18,
			padding: 10
			// placeholder : {
			//     color : color.light.text
			// },
		},
		btn: {
			marginTop: 24,
			backgroundColor: color.light.primary,
			padding: 12,
			paddingLeft: 48,
			paddingRight: 48,
			borderRadius: 32
		},
		btnText: {
			color: '#FFFFFF'
		},
		shadow: {
			shadowColor: 'black',
			shadowOffset: {
				width: 3,
				height: 3
			},
			shadowOpacity: 0.1,
			shadowRadius: 4
		},
		container: {
			width: '100%',
			alignItems: 'center',
			marginTop: 0
		},
		inputGroup: {
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 20,
			marginBottom: 16,
			borderRadius: 8,
			height: 50,
			fontWeight: "bold",
			input: {
				alignItems: 'center',
				color: color.light.textSecondary,
				backgroundColor: color.light.secondaryBackground,
				borderRadius: 8,
				margin: 0,
				paddingLeft: 12,
				marginTop: 8,
				height: 40,
				textAlign: 'left'
			},
			inputDisable: {
				backgroundColor: color.light.grey,
				alignItems: 'center',
				color: color.light.textSecondary,
				borderRadius: 8,
				margin: 0,
				paddingLeft: 12,
				marginTop: 8,
				height: 40,
				textAlign: 'left'
			}
		},
		inputGroupDisable: {
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 20,
			marginBottom: 16,
			padding: 12,
			borderRadius: 8,
			height: 50,
			fontWeight: "bold",
		}
	}
};

export const pickerSelectStyles = {
	dark: {
		inputIOS: {
			paddingVertical: 12,
			paddingHorizontal: 10,
			paddingLeft: 18,
			borderRadius: 12,
			marginTop: 14,
			backgroundColor: color.dark.secondaryBackground,
			color: color.dark.text,
			shadowColor: 'black',
			shadowOffset: {
				width: 6,
				height: 6
			},
			shadowOpacity: 0.1,
			shadowRadius: 8,
			paddingRight: 30 // to ensure the text is never behind the icon
		},
		inputAndroid: {
			paddingVertical: 12,
			paddingLeft: 18,
			width: 100,
			paddingHorizontal: 10,
			borderRadius: 32,
			backgroundColor: '#f7f7f7',
			shadowColor: 'black',
			shadowOffset: {
				width: 6,
				height: 6
			},
			shadowOpacity: 0.1,
			shadowRadius: 8,
			paddingRight: 30
		}
	},
	light: {
		inputIOS: {
			paddingVertical: 12,
			paddingHorizontal: 10,
			paddingLeft: 18,
			borderRadius: 12,
			marginTop: 14,
			backgroundColor: '#f7f7f7',
			shadowColor: 'black',
			shadowOffset: {
				width: 6,
				height: 6
			},
			shadowOpacity: 0.1,
			shadowRadius: 8,
			paddingRight: 30 // to ensure the text is never behind the icon
		},
		inputAndroid: {
			paddingVertical: 12,
			paddingLeft: 18,
			paddingHorizontal: 10,
			borderRadius: 32,
			backgroundColor: '#f7f7f7',
			shadowColor: 'black',
			shadowOffset: {
				width: 6,
				height: 6
			},
			shadowOpacity: 0.1,
			shadowRadius: 8,
			paddingRight: 30
		}
	}
};
