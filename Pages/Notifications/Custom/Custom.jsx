import Text from "../../../Components/Text";
import {color, theme} from "../../../assets/styles/style";
import {UserContext} from "../../../Context/UserContext";
import { useIsFocused } from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from "react-native";
import {useContext, useEffect, useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import SingleCustomNotification from "../SingleCustomNotification";

export default function Custom(){

    const navigation = useNavigation();
    const userContext = useContext(UserContext);
    const mode = userContext.theme;

    const isFocused = useIsFocused();
    const { isNotif, setIsNotif } = useContext(UserContext);

    const notifData = {
        id : 5,
        title : "Qualité air chambre",
        color : "green",
        icon : "check-circle",
        isPassed : true
    }

    useEffect(() => {
        if (isFocused) {
            setIsNotif(true);
        } else {
            setIsNotif(false);
        }

        return () => {
            setIsNotif(false);
        };
    }, [isFocused]);

    return (
        <ScrollView contentContainerStyle={[theme[mode].container]}>
           <TouchableOpacity onPress={() => navigation.navigate('SingleNotification')}>
               <SingleCustomNotification datas={notifData}/>
           </TouchableOpacity>
        </ScrollView>
    )
}