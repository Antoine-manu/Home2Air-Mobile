import {color, theme} from "./assets/styles/style";
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from "./Navigations/LoginNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from "./Context/UserContext";
import {useState} from "react";

export default function App() {
    const [id, setID] = useState(null);
    const [token, setToken] = useState(null);
    const [isDark, setIsDark] = useState("dark");
    const containerTheme = {
        colors: {
            primary: color[isDark].primary,
            background: color[isDark].background
        },
    };
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
                    setToken : setToken,
                    theme : isDark,
                    setTheme : setIsDark
                }}
              >
                <Navigation/>
              </UserContext.Provider>
          </NavigationContainer>
      </>
  );
}
