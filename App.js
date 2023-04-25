import {color, theme} from "./assets/styles/style";
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from "./Navigations/LoginNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from "./Context/UserContext";
import {useState} from "react";

export default function App() {
    const containerTheme = {
        colors: {
            primary: color.primary,
            background: color.background
        },
    };
    const [id, setID] = useState(null);
    const [token, setToken] = useState(null);

  return (
      <>
          <NavigationContainer
            theme={containerTheme}
          >
              <UserContext.Provider
                value={{
                    id: id,
                    setID : setID,
                    token : token,
                    setToken : setToken
                }}
              >
                <Navigation/>
              </UserContext.Provider>
          </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
