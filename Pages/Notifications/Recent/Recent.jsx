import Text from "../../../Components/Text";
import SingleNotification from "../SingleNotification";
import {theme} from "../../../assets/styles/style";
import {ScrollView} from "react-native";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {fetchRoute} from "../../../Utils/auth";
import {useIsFocused} from "@react-navigation/native";
export default function Recent(){
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const [notifications, setNotifs] = useState([]);
    const focused = useIsFocused()

    useEffect(() => {
        getNotifList()
    }, [focused]);

    const notifData = {
        id : 5,
        text : "Qualité de l'air moyenne dans le salon, ouvrez une fenêtre",
        color : "green",
        icon : "check-circle",
        isPassed : false
    }

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

    return (
        <ScrollView contentContainerStyle={[theme[mode].container]}>
            {notifications.length > 0 ?
                notifications.map(notif =>
                        <SingleNotification key={notif.id} datas={notif}/>
                )
                : ""
            }
        </ScrollView>
    )
}