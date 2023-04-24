import {theme} from "./assets/styles/style";
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigation from "./Navigations/LoginNavigation";
import Navigation from "./Navigations/Navigation";

export default function App() {
  return (
      <>
          <NavigationContainer>
              <Navigation/>
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
