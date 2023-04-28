export const color = {
	primary: '#036DDF',
	red: '#E54E4E',
	blue: '#036DDF',
	yellow: '#F2B82F',
	green: '#00A67F',
	purple: '#56459E',
	light: '#ffffff',
	black: '#000',
	lightgrey: '#e7e7e7',
	grey: '#DADADA',
	darkgrey: '#A7A7A7',
	darkblue: '#000329',
	background: '#F5F5F5'
};

export const theme = {
	input: {
		width: 300,
		height: 40,
		backgroundColor: '#f7f7f7',
		borderRadius: 32,
		margin: 12,
		marginTop: 16,
		elevation: 5,
		paddingLeft: 18,
		shadowColor: 'black',
		shadowOffset: {
			width: 6,
			height: 6
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		padding: 10
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
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 6,
			height: 6
		},
		shadowOpacity: 0.1,
		shadowRadius: 8
	}
};

export const pickerSelectStyles = {
	inputIOS: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		paddingLeft: 18,
		borderRadius: 32,
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
		// backgroundColor: '#f7f7f7',
		shadowColor: 'black',
		shadowOffset: {
			width: 6,
			height: 6
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		paddingRight: 30
	}
};
