import * as React from 'react';
import {auth, db,  refst} from '../Firebase/firebase'
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image} from "react-native";
import { TextInput, Button, Avatar,  Menu } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import {  useraddid,  useremail, usernik, userlastlogin, userphotourl, authuser,userid,chatid} from "../Store/datauser";
//import storage from '@react-native-firebase/storage';

//console.log("Хранилище: "+storage)
export const Profilepage =({navigation}) => {
  let rt = useSelector((state)=>state.UserId)
  const rr = rt.avatar 
 // console.log(rt)
 
  const dispatch = useDispatch()
  const singinout = () =>{
    dispatch(useraddid(''))
    dispatch(useremail(''))
    dispatch(usernik('')) 
    dispatch(userlastlogin(''))
    dispatch(userphotourl(''))
    dispatch(authuser(false))
    dispatch(userid(''))
    dispatch(chatid(""))
    auth.signOut();
    navigation.navigate('Authpage')
   }

   const chat =() =>{
    navigation.navigate('Chatpage')
   }
   const accountp =()=>{
    navigation.navigate('Editprofile')
   }

   
    return ( (rr)?
    <View style={styles.container}>
      <View style={styles.top}>
         <Text style={styles.pr}>Профиль пользователя</Text>
         <Avatar.Image style={styles.img} size={130} source={{uri: rr}} />
      </View>
       <View style={styles.menu}>
          <Menu.Item leadingIcon="account-check-outline"  onPress={accountp} title="Аккаунт" />
          <Menu.Item style = {{marginTop:10, fontSize:50, color: '#20232a',}} leadingIcon="message-outline" onPress={chat}  title="Чаты" />
          <Menu.Item style = {{marginTop:10, fontSize:50}} leadingIcon="exit-to-app"  onPress={singinout} title="Выход" />    
       </View>
     </View>: <Text></Text>   
) 
}

//<Button title = "Выход" onPress={singinout} mode="contained" style={styles.but}>Выход</Button>
const styles = StyleSheet.create({
  but:{ 
    fontSize:30,
    backgroundColor:'#075bd9',
    color:'#fff'
  },
  pr:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:40
  },
  container: {
    flex:1,
    backgroundColor:'white'
   },
   img:{
     marginTop: 10,
    
   },
   top:{
    
    alignItems:'center'
   },
   menu:{
   
  marginTop:40,

   },
  
})
