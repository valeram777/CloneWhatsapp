import React, {useState, useEffect, useContext, createContext } from "react";
import { View, Text,  Image  } from 'react-native';
import {auth, db,  collection, query, where, getDocs, doc } from '../Firebase/firebase'
import { TextInput, Button, Avatar,  Menu } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

export const Userlist =({navigation}) => {
    const [user, Setuser] = useState([])
    const poisk = async() =>{
        db.collection("users").where("name", "==", 'Artur')
         .get()
         .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 console.log(doc.id, " => ", doc.data());
             });
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
       }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Поиск человека</Text>
      </View>
  )
}