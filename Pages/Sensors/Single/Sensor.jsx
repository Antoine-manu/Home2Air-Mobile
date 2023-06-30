import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
import { Svg, Rect, Text as TextSVG } from "react-native-svg";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView
} from "react-native";
import { color, theme } from "../../../assets/styles/style";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import Text from "../../../Components/Text";
import { fetchRoute } from "../../../Utils/auth";
import { UserContext } from "../../../Context/UserContext";
import { add } from "react-native-reanimated";

export default function Sensor({ navigation, route }) {
  const userContext = useContext(UserContext);
  const { id, name, url } = route.params;
  const mode = userContext.theme;
  const Dimensions = useWindowDimensions();
  const [temperature, setTemperature] = useState(0.0);
  const [pressure, setPressure] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);
  const [light, setLight] = useState(0.0);
  const [reduced, setReduced] = useState(0.0);
  const [oxidised, setOxidised] = useState(0.0);
  const [ammoniac, setAmmoniac] = useState(0.0);
  const [particules0, setPart0] = useState(0.0);
  const [particules1, setPart1] = useState(0.0);
  const [particules2, setPart2] = useState(0.0);
  const [daily, setDaily] = useState([]);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState("");
  const [labels, setLabels] = useState([]); // days labels
  const [isLoading, setIsLoading] = useState(true);
  let [tooltipPos, setTooltipPos] = useState(
    { x: 0, y: 0, visible: false, value: 0 })
  useEffect(() => {
    fetchProbeDatas().then(() => setIsLoading(false));
    // setIsLoading(false)
  }, []);

  const fetchProbeDatas = async () => {
    console.log('url', url)
    const response = await fetchRoute(
      "probe/",
      "post",
      { address: url },
      userContext.token
    );
    console.log(response.data)
    //La dernière data de stream, le 3ème élément du tableau response
    setTemperature(response[1][response[1].length - 1].temperature);
    setPressure(response[1][response[1].length - 1].pressure);
    setHumidity(response[1][response[1].length - 1].humidity);
    setLight(response[1][response[1].length - 1].light);
    setReduced(response[1][response[1].length - 1].reduced);
    setOxidised(response[1][response[1].length - 1].oxidised);
    setAmmoniac(response[1][response[1].length - 1].ammoniac);
    setPart0(response[1][response[1].length - 1].particules0);
    setPart1(response[1][response[1].length - 1].particules1);
    setPart2(response[1][response[1].length - 1].particules2);
    setDaily(response[0]);
    setDate(getCurrentDate);
    setDays(getPastSixDays);
    let _labels = [];
    let past = getPastSixDays();
    for (let i = 0; i < past.length; i++) {
      _labels.push(getDayOfWeek(past[i]));
    }
    setLabels(_labels);
  };

  const styles = StyleSheet.create({
    content: {
      marginTop: 24
    },
    qualityText: {
      marginTop: 24,
      alignItems: "center",
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: color[mode].red
      },
      subtitle: {
        fontSize: 16,
        color: color[mode].darkgrey
      }
    },
    tags: {
      marginTop: 24,
      flexDirection: "row",
      alignItems: "center",
      width: "85%",
      justifyContent: "space-between",
      tag: {
        flexDirection: "row",
        alignItems: "center",
        icon: {
          color: color[mode].primary
        },
        text: {
          fontSize: 16,
          marginStart: 6,
          fontWeight: "bold",
          color: color[mode].primary
        }
      }
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "left",
      alignSelf: "flex-start",
      marginStart: "5%",
      marginTop: 32,
      marginBottom: 8
    }
  });

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };

  const getDayOfWeek = date => {
    const daysOfWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ];
    const dayOfWeek =
      daysOfWeek[new Date(date.split("/").reverse().join("-")).getDay()];
    return dayOfWeek;
  };

  const getPastSixDays = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();

      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }

      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      dates.push(`${day}/${month}/${year}`);
    }
    return dates;
  };

  return (
    <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <>
          {daily && (
            <CircularProgress
              value={Number(daily[date])}
              maxValue={100}
              radius={100}
              duration={1000}
              activeStrokeColor={
                daily[date] > 50 ? color[mode].red : color[mode].green
              }
              inActiveStrokeColor={color[mode].grey}
              title={"AQI"}
              titleColor={color[mode].text}
              titleStyle={{ fontWeight: "bold" }}
            />
          )}

          <View style={styles.qualityText}>
            <Text
              style={
                daily[date] > 50 ? { color: color[mode].red } : { color: color[mode].green }
              }
            >
              Qualité de l'air
            </Text>

            <Text style={styles.qualityText.subtitle}>
              {daily[date] > 50 ? "Mauvaise" : "Correcte"}
            </Text>
          </View>

          <View style={styles.tags}>
            <View style={styles.tags.tag}>
              <FontAwesome style={styles.tags.tag.icon} name="thermometer" size={24} />
              <Text style={styles.tags.tag.text}>{temperature}</Text>
            </View>

            <View style={styles.tags.tag}>
              <Feather name="wind" size={24} style={styles.tags.tag.icon} />
              <Text style={styles.tags.tag.text}>{particules0} PM.1</Text>
            </View>

            <View style={styles.tags.tag}>
              <MaterialCommunityIcons
                style={styles.tags.tag.icon}
                name="water-percent"
                size={24}
              />
              <Text style={styles.tags.tag.text}>{humidity}%</Text>
            </View>

            <View style={styles.tags.tag}>
              <MaterialCommunityIcons name="molecule-co2" size={24} style={styles.tags.tag.icon} />
              <Text style={styles.tags.tag.text}>{oxidised}</Text>
            </View>
          </View>

          <Text style={styles.text}>Qualité de l'air</Text>

          {daily && (
            <View>
              <LineChart
                data={{
                  labels: [labels[5], labels[4], labels[3], labels[2], labels[1], labels[0]],
                  datasets: [
                    {
                      data: [
                        daily[days[5]] ? daily[days[5]] : 0,
                        daily[days[4]] ? daily[days[4]] : 0,
                        daily[days[3]] ? daily[days[3]] : 0,
                        daily[days[2]] ? daily[days[2]] : 0,
                        daily[days[1]] ? daily[days[1]] : 0,
                        daily[days[0]] ? daily[days[0]] : 0,
                      ],
                    },
                  ],
                }}
                width={Dimensions.width - 10}
                height={220}
                withHorizontalLabels={true}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: color[mode].primary,
                  backgroundGradientTo: color[mode].primary,
                  decimalPlaces: 2,
                  color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: { r: "5", strokeWidth: "2", stroke: "white" },
                }}
                bezier
                fromZero={true}
                decorator={() => {
                  return (
                    <View>
                      <Svg>
                        <Rect x={tooltipPos.x - 20} y={tooltipPos.y + 10} width="50"
                          height="30" fill="black" />
                        <TextSVG
                          x={tooltipPos.x + 5} y={tooltipPos.y + 30}
                          fill="white"
                          fontSize="16"
                          fontWeight="bold"
                          textAnchor="middle">
                          {tooltipPos.visible ? tooltipPos.value : '0.0'}
                        </TextSVG>
                      </Svg>
                    </View>
                  )

                }}
                onDataPointClick={
                  (data) => {
                    // check if we have clicked on the same point again
                    let isSamePoint = (tooltipPos.x === data.x
                      && tooltipPos.y === data.y)

                    // if clicked on the same point again toggle visibility
                    // else,render tooltip to new position and update its value
                    isSamePoint ? setTooltipPos((previousState) => {
                      return {
                        ...previousState,
                        value: data.value,
                        visible: !previousState.visible
                      }
                    })
                      :
                      setTooltipPos({
                        x: data.x,
                        value: data.value, y: data.y,
                        visible: true
                      });
                  } // end function
                }
                style={{
                  marginStart: "8%",
                  paddingRight: 45,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}
