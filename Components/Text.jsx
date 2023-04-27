import {Text} from "react-native";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";
import {color} from "../assets/styles/style";

export default function CustomText({children, style}){

    const userContext = useContext(UserContext);
    const mode = userContext.theme
    const styleText = {
        color : color[mode].text
    }

    const styleArray = style ? [styleText, style] :  styleText
    console.log(styleArray)

    return(
            <Text style={styleArray}>
                {children}
            </Text>
    )
}