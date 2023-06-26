import Text from "../../../Components/Text";
import {color, theme} from "../../../assets/styles/style";
import {UserContext} from "../../../Context/UserContext";
import { useIsFocused } from '@react-navigation/native';
import {TouchableOpacity} from "react-native";
import {useContext, useEffect, useCallback} from "react";
import {useNavigation} from "@react-navigation/native";

export default function Custom(){

    const navigation = useNavigation();
    const userContext = useContext(UserContext);
    const mode = userContext.theme;

    const isFocused = useIsFocused();
    const { isNotif, setIsNotif } = useContext(UserContext);

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
        <>

        </>
    )
}