import CircularProgress from 'react-native-circular-progress-indicator';
import {
	StyleSheet,
	useWindowDimensions,
	View,
	ScrollView
} from 'react-native';
import { color, theme } from '../../../assets/styles/style';
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
	Feather
} from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useContext } from 'react';
import Text from '../../../Components/Text';
import { UserContext } from '../../../Context/UserContext';

export default function Sensor() {
	const userContext = useContext(UserContext);
	const mode = userContext.theme;
	const Dimensions = useWindowDimensions();

	const styles = StyleSheet.create({
		content: {
			marginTop: 24
		},
		qualityText: {
			marginTop: 24,
			alignItems: 'center',
			title: {
				fontSize: 24,
				fontWeight: 'bold',
				color: color[mode].red
			},
			subtitle: {
				fontSize: 16,
				color: color[mode].darkgrey
			}
		},
		tags: {
			marginTop: 24,
			flexDirection: 'row',
			alignItems: 'center',
			width: '85%',
			justifyContent: 'space-between',
			tag: {
				flexDirection: 'row',
				alignItems: 'center',
				icon: {
					color: color[mode].primary
				},
				text: {
					fontSize: 16,
					marginStart: 6,
					fontWeight: 'bold',
					color: color[mode].primary
				}
			}
		},
		text: {
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'left',
			alignSelf: 'flex-start',
			marginStart: '5%',
			marginTop: 32,
			marginBottom: 8
		}
	});

	return (
		<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
			<CircularProgress
				value={50}
				maxValue={200}
				radius={140}
				duration={1000}
				activeStrokeColor={color[mode].red}
				inActiveStrokeColor={color[mode].grey}
				title={'AQI'}
				titleColor={color[mode].text}
				titleStyle={{ fontWeight: 'bold' }}
			/>
			<View style={styles.qualityText}>
				<Text style={styles.qualityText.subtitle}>Qualité de l'air</Text>
				<Text style={styles.qualityText.title}>Mauvaise</Text>
			</View>
			<View style={styles.tags}>
				<View style={styles.tags.tag}>
					<FontAwesome
						style={styles.tags.tag.icon}
						name="thermometer"
						size={24}
					/>
					<Text style={styles.tags.tag.text}>18°C</Text>
				</View>
				<View style={styles.tags.tag}>
					<Feather name="wind" size={24} style={styles.tags.tag.icon} />
					<Text style={styles.tags.tag.text}>10 PM.1</Text>
				</View>
				<View style={styles.tags.tag}>
					<MaterialCommunityIcons
						style={styles.tags.tag.icon}
						name="water-percent"
						size={24}
					/>
					<Text style={styles.tags.tag.text}>35%</Text>
				</View>
				<View style={styles.tags.tag}>
					<MaterialCommunityIcons
						name="molecule-co2"
						size={24}
						style={styles.tags.tag.icon}
					/>
					<Text style={styles.tags.tag.text}>1552</Text>
				</View>
			</View>
			<Text style={styles.text}>Qualitée de l'air</Text>
			<LineChart
				data={{
					labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
					datasets: [
						{
							data: [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100
							]
						}
					]
				}}
				width={Dimensions.width - 40} // from react-native
				height={220}
				withHorizontalLabels={false}
				chartConfig={{
					backgroundColor: '#e26a00',
					backgroundGradientFrom: color[mode].primary,
					backgroundGradientTo: color[mode].primary,
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
						paddingLeft: -20
					},
					propsForDots: {
						r: '5',
						strokeWidth: '2',
						stroke: 'white'
					}
				}}
				bezier
				style={{
					marginStart: '8%',
					paddingRight: 32,
					marginVertical: 8,
					borderRadius: 16
				}}
			/>
		</ScrollView>
	);
}
