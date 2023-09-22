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
import {FontAwesome, FontAwesome5, Octicons, Entypo, Feather} from "@expo/vector-icons";
import SmallSensor from "../../Components/smallSensor";
import { UserContext } from "../../Context/UserContext";
import { useState, useContext, useEffect } from "react";
import { fetchRoute } from "../../Utils/auth";
import Select from "../../Components/Select";
export default function Home() {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const setContextPlace = userContext.setPlace
  const mode = userContext.theme;
  const [place, setPlace] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [loading, setLoading] = useState()
  const [rooms, setRooms] = useState([]);
  const [dropdownDisplay, setDropdownDisplay] = useState("none");
  const [_default, setDefault] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");
  const [notifications, setNotifs] = useState([]);
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
      width: 45,
      padding: 8,
      paddingLeft: 8,
      paddingRight: 8,
      height: 45,
      justifyContent: "center",
      alignItems: 'center',
      disable : {
        backgroundColor: color[mode].secondaryBackground
      }
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
    },
    link : {
      color : color[mode].light
    },
    modal :{
      justifyContent: "center",
      borderRadius: 8,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: color[mode].secondaryBackground,
      alignItems: "center",
      padding: 12,
      marginTop : 32,
      underquote: {
        textAlign: 'center',
        color: 'darkgrey'
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8
      }
    },
    dropdown : {
      position: "absolute",
      bottom: 110,
      display: dropdownDisplay,
      borderRadius : 8,
      item : {
        padding : 16,
        paddingRight : 64,
        paddingLeft : 64,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: color[mode].secondaryBackground,
        topI : {
          borderTopLeftRadius : 8,
          borderTopRightRadius : 8
        },
        bottomI : {
          borderBottomLeftRadius : 8,
          borderBottomRightRadius : 8
        },
        icon : {
          marginRight: 4,
        },
        bordered : {
          borderBottomWidth: 2,
          borderBottomColor: color[mode].grey,
        }
      },
    },
    notifCount : {
      position: "absolute",
      top : -7,
      right : -7,
      alignItems: "center",
      textAlign: "center",
      backgroundColor: color[mode].primary,
      text : {
        color: color[mode].light,
        fontWeight: "bold"
      },
      borderRadius : 32,
      width : 18,
      height : 18,
      zIndex : 1222
    }
  });

  useEffect(() => {
    setDefault([])
    getPlacesList();
    getNotifList();
    setDropdownDisplay("none")
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

  const getNotifList = async () => {
    const notif = await fetchRoute(
        "/notifications/find-recent",
        "post",
        {
          user_id: userContext.userId
        },
        userContext.token
    );
    setNotifs(notif);
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
      setContextPlace(places[0]);
      const place_id = places[0].id
      searchRooms(place_id);
      setLoading(false)
    } else {
      setLoading(true)
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

  return (
    <View style={[theme[mode].container, styles.content]}>
      <View style={styles.header.container}>
        <View style={styles.inputGroup}>
          {loading == true ?
              "":
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
          }
        </View>
        <View style={styles.header.right.layout}>
          <TouchableOpacity style={styles.header.right.bell}>
            {notifications.length > 0 ?
                <View style={styles.notifCount}>
                  <Text style={styles.notifCount.text}>{notifications.length}</Text>
                </View> : ""}
            <Octicons
              name="bell-fill"
              size={20}
              color={color[mode].text}
              onPress={() => navigation.navigate("Notifications", {place : _default})}
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
        {(loading == true) ?
            <View style={styles.modal}>
              <Text style={styles.modal.title}>Vous n'avez aucun espace de créer</Text>
              <Image source={require('../../assets/space.png')} style={{width: 300, height: 300}}/>
              <Text style={styles.modal.underquote}>Un espace représente le lieu dans lequel vous allez installer vos capteurs (par exemple votre maison ou bureau)</Text>
              <TouchableOpacity style={theme[mode].btn} onPress={() => navigation.navigate("CreateSpace")}><Text style={[styles.link, ]}>Créez en un</Text></TouchableOpacity>
            </View>
            : ""}
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
        </View>
        <View style={styles.compense}></View>
      </ScrollView>
      {loading == true ? "" :
        <View style={styles.bottom}>
          <View style={styles.dropdown}>
            <TouchableOpacity style={[styles.dropdown.item, styles.dropdown.item.topI, styles.dropdown.item.bordered]} onPress={() => navigation.navigate("ChooseSensor", {place : _default})}>
              <Feather style={styles.dropdown.item.icon} name="plus-circle" size={20} color={color[mode].primary} />
              <Text style={styles.dropdown.item.text}> Ajouter un capteur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dropdown.item, styles.dropdown.item.bordered]} onPress={() => navigation.navigate("CreateRoom")}>
              <Feather style={styles.dropdown.item.icon} name="plus-circle" size={20} color={color[mode].primary} />
              <Text style={styles.dropdown.item.text}> Ajouter une pièce</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dropdown.item, styles.dropdown.item.bottomI]} onPress={() => navigation.navigate("CreateSpace")}>
              <Feather style={styles.dropdown.item.icon} name="plus-circle" size={20} color={color[mode].primary} />
              <Text style={styles.dropdown.item.text}> Ajouter un espace</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[theme[mode].btn, styles.btn, dropdownDisplay == "none" ? "" : styles.btn.disable]}
            onPress={() => setDropdownDisplay(dropdownDisplay == "none" ? "flex": "none")}
          >
            {dropdownDisplay == "none" ?
                <Entypo name="dots-three-horizontal" size={24} color={color[mode].light}/>
                :
                <Ionicons name="close" size={24} color={color[mode].text} />
            }
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}
