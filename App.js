//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Allpages} from './Pages/Allpages'
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {configureFonts, MD3LightTheme} from 'react-native-paper';
import { Provider } from 'react-redux'
import  store  from './Store/store';
import { LogBox } from "react-native"
//import uuid from "react-native-uuid"
LogBox.ignoreAllLogs(true)
export default function App() {
  const fontConfig = {
    fontFamily: 'Roboto'
  };
  
  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({config: fontConfig}),
  };
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Allpages /> 
         </View>
       </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
