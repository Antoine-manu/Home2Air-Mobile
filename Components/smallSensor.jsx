import { View, TouchableOpacity } from "react-native";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import { theme, color } from "../assets/styles/style";
import { useNavigation } from "@react-navigation/native";
import {useContext, useEffect, useState} from "react";
import Text from "./Text";
import { UserContext } from "../Context/UserContext";
import {fetchRoute} from "../Utils/auth";

export default function SmallSensor({ id, name, address }) {
  const navigation = useNavigation();
  const [aqi, setAqi] = useState();
  const userContext = useContext(UserContext);
  const mode = userContext.theme;
  console.log('ICIIIII')

  const styles = {
    btnSmall: {
      height: 32,
      padding: 8,
      paddingLeft: 32,
      paddingRight: 32
    },
    btnSmallText: {},
    smallSensor: {
      marginTop: 16,
      width: 350,
      height: 110,
      padding: 16,
      borderRadius: 16,
      backgroundColor: color[mode].modalBg,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    smallSensorLayout: {
      left: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        textLayout: {
          fontSize: 16,
        },
        aqi: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      right: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        gear: {
          width: "100%",
          icon: {
            alignSelf: "flex-end",
            color: color[mode].text
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchProbeDatas();
  }, []);

  const fetchProbeDatas = async () => {
    const response = await fetchRoute(
        "probe/",
        "post",
        { address: address },
        userContext.token
    );
    if(response){
      setAqi(response[2][2])
    }
  };

  return (
    <View style={[styles.smallSensor, theme[mode].shadow]}>
      <View style={styles.smallSensorLayout.left}>
        <Text style={styles.smallSensorLayout.left.textLayout}>
          {name}
        </Text>
        {/* Use the name prop here */}
        <Text style={[styles.smallSensorLayout.left.aqi, {color : aqi > 33 ? aqi > 66 ? '#00A67F' : '#F2B82F' : '#E54E4E'}]}>
          {parseInt(aqi)} AQI  {aqi < 66 ?  aqi > 33 ? <FontAwesome name="warning" size={16} color={'#F2B82F'}/> : <FontAwesome5 name="skull" size={16} color={'#E54E4E'}/>: ''}
        </Text>
      </View>
      <View style={styles.smallSensorLayout.right}>
        <TouchableOpacity
          style={styles.smallSensorLayout.right.gear}
          onPress={() =>
            navigation.navigate("EditSensor", { id: id, url: address })}
        >
          <FontAwesome
            name="gear"
            size={24}
            style={styles.smallSensorLayout.right.gear.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[theme[mode].btn, styles.btnSmall]}
          onPress={() =>
            navigation.navigate("Sensor", {
              id: id,
              name: name,
              url: address
            })}
        >
          <Text style={[theme[mode].btnText, styles.btnSmallText]}>Voir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
