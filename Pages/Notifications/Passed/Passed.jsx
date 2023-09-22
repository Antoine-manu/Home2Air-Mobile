import Text from "../../../Components/Text";
import SingleNotification from "../SingleNotification";
import {theme} from "../../../assets/styles/style";
import {ScrollView} from "react-native";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {useIsFocused} from "@react-navigation/native";
import {fetchRoute} from "../../../Utils/auth";

export default function Passed(){
    const userContext = useContext(UserContext);
    const mode = userContext.theme;
    const [notifications, setNotifs] = useState([]);
    const focused = useIsFocused()

    useEffect(() => {
        getNotifList()
    }, [focused]);

    const getNotifList = async () => {
        const notif = await fetchRoute(
            "/notifications/find-passed",
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
                    <SingleNotification datas={notif}/>
                )
                : ""
            }
        </ScrollView>
    )
}