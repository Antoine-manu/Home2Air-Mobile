import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
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

export default function Sensor() {
  const userContext = useContext(UserContext);
  const mode = userContext.theme;
  const Dimensions = useWindowDimensions();
  const [temperature, setTemperature] = useState(0.0);
  const [pressure, setPressure] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);
  const [light, setLight] = useState(0.0);
  const [reduced, setReduced] = useState(0.0);
  const [oxidised, setOxidised] = useState(0.0);
  const [ammoniac, setAmmoniac] = useState(0.0);
  const [part0, setPart0] = useState(0.0);
  const [part1, setPart1] = useState(0.0);
  const [part2, setPart2] = useState(0.0);
  const [aqi, setAqi] = useState([]);
  const [chart, setChart] = useState([]);
  const date = useState(getCurrentDate());
  useEffect(() => {
    fetchProbeDatas();
  }, []);

  const fetchProbeDatas = async () => {
    try {
      const datas = await fetchRoute("/probe", "post", null, userContext.token);
      if (datas) {
        setTemperature(datas.temperature);
        setPressure(datas.pressure);
        setHumidity(datas.humidity);
        setLight(datas.light);
        setReduced(datas.reduced); //carbon monoxide CO
        setOxidised(datas.oxidised); //nitrogen dioxide
        setAmmoniac(datas.ammoniac);
        setPart0(datas.particules0);
        setPart1(datas.particules1);
        setPart2(datas.particules2);
        setAqi(
          sortAqis(
            calculatePollutantAQI("PM2.5", datas.particules1),
            calculatePollutantAQI("PM10", datas.particules1),
            calculatePollutantAQI("SO2", datas.oxidised),
            calculatePollutantAQI("CO", datas.reduced)
          )
        );
        setChart(await getArray());
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }

  function calculateAQI(concentration, Ilow, Ihigh, Clow, Chigh) {
    return (Ihigh - Ilow) / (Chigh - Clow) * (concentration - Clow) + Ilow;
  }


  function calculatePollutantAQI(pollutant, concentration) {
    if (concentration != 0) {
      const pollutants = {
        "PM2.5": {
          Ilow: 101,
          Ihigh: 150,
          Clow: 35.5,
          Chigh: 55.4
        },
        "PM10": {
          Ilow: 101,
          Ihigh: 150,
          Clow: 55,
          Chigh: 154
        },
        "SO2": {
          Ilow: 76,
          Ihigh: 185,
          Clow: 36,
          Chigh: 75
        },
        "CO": {
          Ilow: 51,
          Ihigh: 101,
          Clow: 4.5,
          Chigh: 9.5
        }
      };
      const pollutantData = pollutants[pollutant];
      if (pollutantData) {
        const { Ilow, Ihigh, Clow, Chigh } = pollutantData;
        if (concentration < Clow) {
          return [Ilow, Ihigh, Clow, Chigh, Ilow];
        } else if (concentration > Chigh) {
          return [Ilow, Ihigh, Clow, Chigh, Ihigh];
        } else {
          return [
            Ilow,
            Ihigh,
            Clow,
            Chigh,
            calculateAQI(concentration, Ilow, Ihigh, Clow, Chigh)
          ];
        }
      } else {
        return -1;
      }
    }
  }


  function sortAqis(part1Aqi, part2Aqi, oxidisedAqi, reducedAqi) {
    const aqiList = [part1Aqi[4], part2Aqi[4], oxidisedAqi[4], reducedAqi[4]];
    const maxAqi = Math.max(...aqiList);
    let aqi = null;
    let percentage = null;
    if (maxAqi === part1Aqi[4]) {
      aqi = part1Aqi;
    } else if (maxAqi === part2Aqi[4]) {
      aqi = part2Aqi;
    } else if (maxAqi === oxidisedAqi[4]) {
      aqi = oxidisedAqi;
    } else if (maxAqi === reducedAqi[4]) {
      aqi = reducedAqi;
    }
    if (aqi) {
      percentage = calculatePercentageInRange(
        Number(aqi[4]),
        Number(aqi[0]),
        Number(aqi[1])
      );
      addToArray(percentage);
    }
    return aqi;
  }

  function median(x, y) {
    return (x + y) / 2;
  }

  function calculatePercentageInRange(value, min, max) {
    return (Number(value) - Number(min)) / (Number(max) - Number(min)) * 100;
  }

  const addToArray = async value => {
    try {
      const arrayData = await AsyncStorage.getItem("@storage_Key");
      let array = arrayData ? JSON.parse(arrayData) : [];
      if (array.length === 7) {
        array.shift(); // Remove first element if the array is full
      }
      array.push(value); // Add new value
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(array));
    } catch (e) {
      console.error(e);
    }
  };

  const getArray = async () => {
    try {
      const arrayData = await AsyncStorage.getItem("@storage_Key");
      return arrayData ? JSON.parse(arrayData) : [];
    } catch (e) {
      console.error(e);
    }
    return [];
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
  return (
    <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
      {aqi != undefined &&
        <CircularProgress
          value={Number(
            calculatePercentageInRange(
              Number(aqi[4]),
              Number(aqi[0]),
              Number(aqi[1])
            ) > 100
              ? "100"
              : Number(
                  calculatePercentageInRange(
                    Number(aqi[4]),
                    Number(aqi[0]),
                    Number(aqi[1])
                  )
                )
          )}
          maxValue={100}
          radius={100}
          duration={1000}
          activeStrokeColor={
            aqi.aqi < median(aqi[1], aqi[0])
              ? color[mode].red
              : color[mode].green
          }
          inActiveStrokeColor={color[mode].grey}
          title={"AQI"}
          titleColor={color[mode].text}
          titleStyle={{ fontWeight: "bold" }}
        />}

      <View
        style={styles.qualityText}
        contentContainerStyle={[theme[mode].container, styles.content]}
      >
        <Text
          style={
            aqi < median(aqi[1], aqi[0]) ? color[mode].red : color[mode].green
          }
        >
          Qualité de l'air
        </Text>

        <Text style={styles.qualityText.subtitle}>
          {aqi < median(aqi[1], aqi[0]) ? "Mauvaise" : "Correcte"}
        </Text>
      </View>
      <View style={styles.tags}>
        <View style={styles.tags.tag}>
          <FontAwesome
            style={styles.tags.tag.icon}
            name="thermometer"
            size={24}
          />
          <Text style={styles.tags.tag.text}>
            {temperature}
          </Text>
        </View>
        <View style={styles.tags.tag}>
          <Feather name="wind" size={24} style={styles.tags.tag.icon} />
          <Text style={styles.tags.tag.text}>
            {part0} PM.1
          </Text>
        </View>
        <View style={styles.tags.tag}>
          <MaterialCommunityIcons
            style={styles.tags.tag.icon}
            name="water-percent"
            size={24}
          />
          <Text style={styles.tags.tag.text}>
            {humidity}%
          </Text>
        </View>
        <View style={styles.tags.tag}>
          <MaterialCommunityIcons
            name="molecule-co2"
            size={24}
            style={styles.tags.tag.icon}
          />
          <Text style={styles.tags.tag.text}>
            {oxidised}
          </Text>
        </View>
      </View>
      <Text style={styles.text}>Qualité de l'air</Text>
      {chart.length > 0 &&
        <View>
          <LineChart
            data={{
              labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
              datasets: [
                {
                  data: [
                    chart[0],
                    chart[1],
                    chart[2],
                    chart[3],
                    chart[4],
                    chart[5],
                    chart[6]
                  ]
                }
              ]
            }}
            width={Dimensions.width - 10}
            height={
              220 // from react-native
            }
            withHorizontalLabels={true}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: color[mode].primary,
              backgroundGradientTo: color[mode].primary,
              decimalPlaces: 2,
              color: (opacity = 1) =>
                `rgba(255, 255, 255, ${opacity // optional, defaults to 2dp
                })`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16, paddingLeft: -20 },
              propsForDots: { r: "5", strokeWidth: "2", stroke: "white" }
            }}
            bezier
            style={{
              marginStart: "8%",
              paddingRight: 45,
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>}
    </ScrollView>
  );
}
