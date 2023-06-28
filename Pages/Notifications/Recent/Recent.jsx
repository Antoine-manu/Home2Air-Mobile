import Text from "../../../Components/Text";
import SingleNotification from "../SingleNotification";
import {theme} from "../../../assets/styles/style";
import {ScrollView} from "react-native";
import {useContext} from "react";
import {UserContext} from "../../../Context/UserContext";
export default function Recent(){
    const userContext = useContext(UserContext);
    const mode = userContext.theme;

    const notifData = {
        id : 5,
        text : "Qualité de l'air moyenne dans le salon, ouvrez une fenêtre",
        color : "green",
        icon : "check-circle",
        isPassed : false
    }

    return (
        <ScrollView contentContainerStyle={[theme[mode].container]}>
            <SingleNotification datas={notifData}/>
        </ScrollView>
    )
}