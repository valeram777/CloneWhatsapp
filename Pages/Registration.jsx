import * as React from 'react';
import {StyleSheet,  View,LogBox, TouchableOpacity,  Image} from "react-native";
import { TextInput, Button,Text, HelperText, } from 'react-native-paper';
import {useState, useEffect } from "react";
import {auth, db,  collection, query, where, getDocs, serverTimestamp, Timestamp  } from '../Firebase/firebase'
import {  useraddid,  useremail, usernik, userlastlogin, userphotourl, authuser,userid} from "../Store/datauser";
import { useSelector, useDispatch } from 'react-redux'
import   uuid from 'react-native-uuid';
import { generateKeyPair }  from '../Component/crypto'



import AsyncStorage from '@react-native-async-storage/async-storage';
export const Registration =({navigation}) => {
 
    const dispatch = useDispatch()
    const [userdata, Setuserdata] = useState()

 const [email, Setemail] = useState("")
 const [pass, Setpass] = useState("")
 const [pass2, Setpass2] = useState("")
 const [name, Setname] = useState("")
 const [er, Seter] = useState(false)
 const [ername, Setername] = useState(false)
 const [eremail, Seteremail] = useState(false)
 const[key, SetKey] = useState("")


  const cleare = () =>{
    Setpass("")
    Setpass2("")
  }
  const frombasa = async()=>{
    const entityRef = await db.collection('users').get()
    const rr = await entityRef.docs.map(doc => doc.data())
    const rrr = rr.map((num, index)=>{
        return 'num'+{index}
    })
    
  }

 const disp = (res) =>{
      dispatch(useraddid(res.uid))
      dispatch(useremail(res.email))
      dispatch(usernik(res.displayName)) 
      dispatch(userlastlogin(res.lastLoginAt))
      dispatch(userphotourl(res.photoURL))
      dispatch(authuser('true'))
      dispatch(userid(res.uid))
  }
const updateKey = async() => {
//Получение публичного и секретного ключа для шифрования сообщений
  const { publicKey, secretKey } = generateKeyPair();


// Сохранение секретного ключа в Async storage
await AsyncStorage.setItem("secretKey", secretKey.toString());
await AsyncStorage.setItem("publicKey", publicKey.toString());
// Сохранение публичного ключа для последующего сохранения в базу данных
SetKey(publicKey.toString())
}

const regisprov = async() =>{
    let now = new Date();
    const rr = uuid.v4()
    await auth.createUserWithEmailAndPassword(email, pass)
    .then(doc=>{
        db.collection("users").doc(doc.user.uid).set({
            avatar:'https://firebasestorage.googleapis.com/v0/b/clonewhatsapp-88218.appspot.com/o/images%2F0f3fbe74-8122-47.jpeg?alt=media&token=32cacf0f-43ae-46fd-bf73-906f79af11d2',
            email:doc.user.email,
            name:name,
            id: doc.user.uid,
            date: now,
            publicKey: key,
            image: ""
        });

        disp(doc.user)
        navigation.navigate('Authpage') 
    })
    .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
            alert("The email address is already in use");
        } else if (error.code == "auth/invalid-email") {
            alert("The email address is not valid.");
        } else if (error.code == "auth/operation-not-allowed") {
            alert("Operation not allowed.");
        } else if (error.code == "auth/weak-password") {
            alert("The password is too weak.");
        }
      })
   
   
}

 const reg = () => {
pass != pass2?(Seter(true), cleare() ): Seter(false)
!name ? Setername(true): Setername(false)
!email ? Seteremail(true):Seteremail(false)
// Если все данные есть - генерируется новая пара ключей для шифрования
 if(!er && !ername && !eremail){
  updateKey()
 }

 }

// Как только появляется публичный ключ - идёт запись в базу данных по новому пользователю
 useEffect(()=>{
  key&&regisprov()
},[key])


    return (
        <View style={styles.container}>
          <View style={styles.win}>
        <View >
        <Text variant="headlineLarge">Регистрация</Text>
        </View>
        <TextInput style={styles.input} 
          mode="outlined"
          placeholder="Name" 
          error = {ername}
          value={name} 
          onChangeText={(value)=>Setname(value)}  ></TextInput>

          <TextInput style={styles.input} 
          placeholder="Email" 
          error = {eremail}
          keyboardType="email-address" 
          mode="outlined"
          
          value={email} onChangeText={(value)=>Setemail(value)}
          ></TextInput>

          <TextInput style={styles.input} 
          mode="outlined"
          error = {er}
          placeholder="Password" 
          secureTextEntry={true} value={pass} 
          onChangeText={(value)=>Setpass(value)}  ></TextInput>
          <TextInput style={styles.input} 
          mode="outlined"
          error = {er}
          placeholder="Password" 
          secureTextEntry={true} value={pass2} 
          onChangeText={(value)=>Setpass2(value)}  ></TextInput>
          <View style={styles.cont}>
         
          <View >
         <Button title = "Регистрация" onPress={reg} mode="contained" style={styles.but3}>Регистрация</Button>
          </View>
          </View>
          
          </View>
        </View>
        )
}
const styles = StyleSheet.create({
    container: {
     flex:1,
     backgroundColor:'white'
    },
    but:{ 
      fontSize:20,
      backgroundColor:'#075bd9',
      color:'#fff'
    },
    but2:{
      
      alignItems: 'center' ,
      width:114,
      marginLeft:10
        },
    but3:{
      marginTop:5,
      fontSize:11,
      backgroundColor:'#075bd9',
      color:'#fff'
        },
    cont:{
      marginTop:20,
      
      justifyContent:"center"
    },//flexDirection:"row",
    win:{
     marginLeft:'15%',
      marginTop:'20%',
      width:'70%',
     
    },
    input:{
      marginTop:20,
      width:'99%',
      height:50,
      fontSize:27
    },
    txtlog:{
      fontSize:30,
      marginBottom:10,
      marginTop:20,
    },
    about:{
      marginTop:40,
      textAlign:"right"
    },
    img:{
      width:'97%',
      height:320,
      backgroundColor:'black'
    },
    err:{
        fontSize:15
    }
  });