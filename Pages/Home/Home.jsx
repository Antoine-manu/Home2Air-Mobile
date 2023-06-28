import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { theme, color, pickerSelectStyles } from "../../assets/styles/style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../Components/Text";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import SmallSensor from "../../Components/smallSensor";
import { UserContext } from "../../Context/UserContext";
import { useState, useContext, useEffect } from "react";
import { fetchRoute } from "../../Utils/auth";
import Select from "../../Components/Select";
export default function Home() {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const mode = userContext.theme;
  const [select, setSelect] = useState("");
  const [place, setPlace] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [_default, setDefault] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null); // Add a state variable for search results

	let styles;
	styles = StyleSheet.create({
		content: {
			marginTop: 48
		},
		header: {
			title: {
				fontSize: 20,
				fontWeight: 'bold'
			},
			container: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: 350
			},
			right: {
				layout: {
					flexDirection: 'row',
					alignItems: 'center',
					width: 100,
					justifyContent: 'space-between'
				},
				pp: {
					width: 50,
					height: 50,
					borderRadius: 50
				}
			}
		},
		input: {
			width: 350
		},
		sensors: {
			alignItems: 'center',
			title: {
				marginTop: 24,
				fontSize: 20,
				fontWeight: 'bold'
			},
			underText: {
				marginTop: 6,
				color: color[mode].darkgrey
			}
		},
		bottom: {
			backgroundColor: color[mode].background,
			zIndex: 10,
			width: '100%',
			height: '15%',
			marginTop: 'auto',
			bottom: 0,
			// position: "fixed",
			alignItems: 'center',
			justifyContent: 'flex-start'
		},
		btn: {
			width: 250,
			alignItems: 'center'
		},
		room: {
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: "column",
			title: {
				marginTop: 24
			}
		}
	});

  useEffect(() => {
    getPlacesList();
  }, []);
  const searchRooms = async place_id => {
    const response = await fetchRoute(
      "room/find-by",
      "post",
      { place_id: place_id },
      userContext.token
    );
    setRooms(response);
    console.log("room", response);
  };

  const getPlacesList = async () => {
    const places = await fetchRoute(
      "/place/find-user-place",
      "post",
      {
        user_id: userContext.userId
      },
      userContext.token
    );
    console.log("places", places);
    setPlace(places);
    setDefault(places[0]);
    const rooms = await fetchRoute(
      "room/find-by",
      "post",
      { place_id: places[0] },
      userContext.token
    );
    setRooms(rooms);
    console.log("rooms", rooms);
  };

  const searchSensors = async search => {
    if (search.length > 0) {
      try {
        const response = await fetchRoute(
          "sensor/find-by",
          "post",
          { name: search },
          userContext.token
        );
        if (response) {
          setSearchResults(response); // Store the search results in state
        }
      } catch (err) {
        throw new Error(err.toString);
      }
    }
  };

  // Define a function to render a SmallSensor component for each sensor in the search results

  useEffect(
    () => {
      const renderSearchResults = () => {
        if (searchResults) {
          return searchResults
            .filter(sensor => sensor.deleted !== 1) // Exclude sensors with 'deleted' set to 1
            .map(
              sensor => <SmallSensor id={sensor.id} name={sensor.name} /> // Pass the name prop to SmallSensor
            );
        }
        return null;
      };

      renderSearchResults();
    },
    [searchResults]
  );

  const pickerItems = place.map(r => {
    return { label: `${r.name}`, value: `${r.id}` };
  });
  return (
    <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
      <View style={styles.header.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.title}>
            {_default.name}
          </Text>
          <Select
            label="Sélectionnez une option"
            data={pickerItems}
            onSelect={value => {
              setSelect(value);
              searchRooms(value);
            }}
            defaultValue={_default.name}
            style={pickerSelectStyles[mode]}
          />
        </View>
        <View style={styles.header.right.layout}>
          <TouchableOpacity>
            <Octicons
              name="bell-fill"
              size={24}
              color={color[mode].text}
              onPress={() => navigation.navigate("Notifications")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
            <Image
              style={styles.header.right.pp}
              source={require("../../assets/pp.jpeg")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={[theme[mode].input, styles.input]}
        placeholder="Chercher un capteur"
        onChangeText={text => {
          searchSensors(text);
        }}
        placeholderTextColor={color[mode].textSecondary}
      />
      <View style={styles.sensors}>
        {rooms.length > 0
          ? rooms.map(room =>
              <View style={styles.room} key={room.id}>
                <Text style={styles.room.title}>
                  {room.name}
                </Text>
                {room.Sensor.map(
                  sensor =>
                    sensor.deleted !== 1 &&
                    <View key={sensor.id}>
                      <SmallSensor id={sensor.id} name={sensor.name} />
                    </View>
                )}
              </View>
            )
          : ""}
        {/* {searchResults
          ? searchResults.map(sensor =>
              <SmallSensor id={sensor.id} name={sensor.name} />
            )
          : place.map(
              // Pass the name prop to SmallSensor
              place =>
                <View key={place.id}>
                  <Text style={styles.sensors.title}>
                    {place.name}
                  </Text>
                  <Text style={styles.sensors.underText}>
                    {place.Room.reduce(
                      (sum, room) => sum + room.Sensor.length,
                      0
                    ) + " "}
                    capteurs
                  </Text>
                  {place.Room.map(room =>
                    <View key={room.id}>
                      <Text>
                        {room.name}
                      </Text>
                      {room.Sensor.map(
                        sensor =>
                          sensor.deleted !== 1 &&
                          <SmallSensor
                            key={sensor.id}
                            id={sensor.id}
                            name={sensor.name}
                          />
                      )}
                    </View>
                  )}
                </View>
            )} */}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[theme[mode].btn, styles.btn]}
          onPress={() => navigation.navigate("CreateSensor")}
        >
          <Text style={theme[mode].btnText}>Créer un capteur</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
