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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../Components/Text";
import { FontAwesome, FontAwesome5, Octicons } from "@expo/vector-icons";
import SmallSensor from "../../Components/smallSensor";
import { UserContext } from "../../Context/UserContext";
import { useState, useContext, useEffect } from "react";
import { fetchRoute } from "../../Utils/auth";
import Select from "../../Components/Select";
export default function Home() {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const mode = userContext.theme;
  const [place, setPlace] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [_default, setDefault] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null); // Add a state variable for search results
  const focused = useIsFocused()

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
        width: 350,
      },
      right: {
        layout: {
          flexDirection: 'row',
          alignItems: 'center',
          width: 100,
          justifyContent: 'flex-end'
        },
        pp: {
          width: 50,
          height: 50,
          borderRadius: 50
        },
        bell: {
          marginRight: 16,
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
        fontSize: 18,
        fontWeight: 'bold'
      },
      underText: {
        marginTop: 6,
        color: color[mode].darkgrey
      }
    },
    bottom: {
      backgroundColor: color[mode].background,
      zIndex: 100,
      width: '100%',
      height: '15%',
      bottom: 0,
      position: "absolute",
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    btn: {
      width: 250,
      alignItems: 'center',
    },
    room: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      title: {
        marginTop: 24
      }
    },
    scrolldiv: {
      height: "85%"
    },
    compense: {
      height: 150
    },
    noFound: {
      flexDirection: "row",
      width: "90%",
      textAlign: "center",
      link: {
        color: color[mode].primary,
        layout: {
          paddingTop: 4,
        }
      },
      text: {
        color: color[mode].textSecondary,
      }
    }
  });

  useEffect(() => {
    getPlacesList();
  }, [focused]);
  const searchRooms = async place_id => {
    const rooms = await fetchRoute(
      "room/find-by-place",
      "post",
      { place: place_id },
      userContext.token
    );
    setRooms(rooms);
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
    console.log("places", places.length);
    setPlace(places);
    if (places.length > 0) {
      setDefault(places[0]);
      const place_id = places[0].id
      searchRooms(place_id);
    }
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



  useEffect(() => {
    let pickerItems = place.filter(i => i.id != _default?.id).map(r => {
      return { label: `${r.name}`, value: `${r.id}` };
    });
    setTitleList(pickerItems);
  }, [_default])

  /*  function removeFromPicker(id){
        pickerItems = pickerItems.filter(obj => obj.value !== id);
        console.log('___________________ START')
        pickerItems.map(r => {
            console.log(r, id)
        })
        console.log('___________________ END')
        console.log(pickerItems)
    }*/
  return (
    <View style={[theme[mode].container, styles.content]}>
      <View style={styles.header.container}>
        <View style={styles.inputGroup}>
          <Select
            label="Sélectionnez une option"
            data={titleList}
            title="true"
            onSelect={value => {
              setDefault({ id: value.value });
              searchRooms(value.value);
            }}
            defaultValue={_default.name}
            style={styles.placeTitle}
          />
        </View>
        <View style={styles.header.right.layout}>
          <TouchableOpacity style={styles.header.right.bell}>
            <Octicons
              name="bell-fill"
              size={20}
              color={color[mode].text}
              onPress={() => navigation.navigate("Notifications")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <FontAwesome name="gear" size={24} color={color[mode].text} />
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
      <ScrollView style={styles.scrolldiv}>
        <View style={styles.sensors}>
          {(rooms.length > 0)
            ? rooms.map(room =>
              room.Sensor.length > 0 ?
                <View style={styles.room} key={room.id}>
                  <Text style={styles.sensors.title}>
                    {room.name}
                  </Text>
                  <Text style={styles.sensors.underText}>
                    {room.Sensor.length} capteur(s)
                  </Text>
                  {room.Sensor.map(
                    sensor =>
                      sensor.deleted !== 1 &&
                      <View key={sensor.id}>
                        <SmallSensor id={sensor.id} name={sensor.name} address={sensor.address} />
                      </View>
                  )}
                </View>
                : ""
            ) :
            ""
          }
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
        <View style={styles.compense}></View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[theme[mode].btn, styles.btn]}
          onPress={() => navigation.navigate("CreateSensor")}
        >
          <Text style={theme[mode].btnText}>Ajouter un capteur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
