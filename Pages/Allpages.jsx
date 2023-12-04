//https://oblador.github.io/react-native-vector-icons/
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Addmessagepage} from './Addmessagepage'
import{Chat} from './Chat'
import {Authpage} from './Authpage'
import {Chatpage} from './Chatpage'
import {Editprofile} from './Editprofile'
import {Findeuserpage} from './Finduserpage'
import {Profilepage} from './Profilepage'
import {About} from './About'
import {Registration} from './Registration'
import {Userlist} from './Userlist'
const Stack = createNativeStackNavigator();

export const Allpages = () => {
    return (
<NavigationContainer>
          <Stack.Navigator initialRouteName="Authpage" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Authpage" component={Authpage}  /> 
            <Stack.Screen name="Chat" component={Chat}  /> 
            <Stack.Screen name="Chatpage" component={Chatpage}  /> 
            <Stack.Screen name="Editprofile" component={Editprofile}  /> 
            <Stack.Screen name="Findeuserpage" component={Findeuserpage}  /> 
            <Stack.Screen name="Profilepage" component={Profilepage}  /> 
            <Stack.Screen name="About" component={About}  /> 
            <Stack.Screen name="Registration" component={Registration}  /> 
            <Stack.Screen name="Userlist" component={Userlist}  /> 
          </Stack.Navigator>
  </NavigationContainer>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  