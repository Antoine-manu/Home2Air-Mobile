import {Alert, Button} from "react-native";

//<Button title={"TEST"} onPress={this.createThreeButtonAlert}/>
export default function createAlert(title, message){
    Alert.alert(title, message, [
        {text: 'Ok'},
    ]);
}
