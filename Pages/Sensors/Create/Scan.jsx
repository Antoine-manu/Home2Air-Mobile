import { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import RNPickerSelect from '@react-native-picker/picker';
import { UserContext } from '../../../Context/UserContext';
import Text from '../../../Components/Text';
import QRScanner from '../../../Components/QRScanner';
import { theme, pickerSelectStyles, color } from '../../../assets/styles/style';
import { fetchRoute } from '../../../Utils/auth';
import Select from "../../../Components/Select";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BarCodeScanner} from "expo-barcode-scanner";
import view from "react-native-reanimated/src/reanimated2/component/View";

export default function ScanSensor() {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [room, setRoom] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [reference, setReference] = useState();
    const [scanData, setScanData] = useState();
    const [error, setError] = useState(true);
    const [scan, setScan] = useState(false)
    const [qrShow, setQrShow] = useState(true)
    const [hasPermission, setHasPermission] = useState(false);
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const route = useRoute();
    const place = route.params.place

    const getAllRooms = async () => {
        // const tk = ;
        const r = await fetchRoute('room/find-by-place', 'post', {place : place.id}, userContext.token);
        setRooms(r);
        console.log(r)
    };

    useEffect(() => {
        getAllRooms();
    }, []);

    useEffect(() => {
        if(scanData != null){
            setReference(scanData.reference);
            setName(scanData.name);
            setQrShow(false);
            console.log(name, reference, room);
            if(room != 0 && name != null && reference != null){
                createSensor();
            };
        }
    }, [scanData]);

    const createSensor = async () => {
        const createdBy = `${userContext.userId}`;
        const room_id = room.value;
        const jsonData = {
            name,
            room_id,
            reference,
            createdBy
        };
        const response = await fetchRoute(
            'sensor/create',
            'POST',
            jsonData,
            userContext.token
        );
        if(response){
            navigation.navigate("Home")
        }
    };

    const pickerItems = rooms.map((r) => {
        return { label: `${r.name}`, value: `${r.id}` };
    });
    const styles = StyleSheet.create({
        content: {
            width: '90%',
            alignSelf: 'center',
            flex: 1,
            div: {
                width: '100%',
                alignItems: 'center',
                flex: 1,
            }
        },
        input: {
            width: '100%',
            margin: 0
        },
        inputGroup: {
            alignItems: 'flex-start',
            width: '100%',
            marginTop: 24
        },
        label: {
            marginBottom: -10
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
        hidden: {
            display: 'none'
        },
        end : {
            marginTop: 48,
            marginBottom: 24,
            fontSize: 24,
            fontWeight: 'bold',
            color: '#0D6EFD'
        }
    });
    return (
        <ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
            {scan == true ?
                (
                    qrShow == true ?
                        <QRScanner close={setScan} data={scanData} submit={setScanData}/>
                        : ''
                )
                :
                <View style={[styles.content.div]}>
                    <View style={theme[mode].inputGroup}>
                        <Text >Choissez une pièce ou est vôtre capteur</Text>
                        <Select
                            label="Sélectionnez une option"
                            data={pickerItems}
                            onSelect={(value) => setRoom(value)}
                            style={theme[mode].inputGroup.input}
                        />
                        <TextInput
                            style={styles.hidden}
                            defaultValue={toString(room)}
                            placeholderTextColor={color[mode].textSecondary}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={ () => setScan(true)}>
                            <Text style={theme[mode].btnText}>Suivant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {reference != null ?
                <>
                    <View style={[styles.content.div]}>
                        <Text style={styles.end}>Capteur reconnu !</Text>
                        <Image source={require('../../../assets/end.png')} style={{width: 300, height: 300}}/>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={[theme[mode].btn, styles.btn]} onPress={createSensor}>
                            <Text style={theme[mode].btnText}>
                                Suivant
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                : ''}
        </ScrollView>
    );
}
