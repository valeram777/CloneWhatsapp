
import React, {useState, useEffect, useContext, createContext } from "react";
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image} from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { TextInput, Button } from 'react-native-paper';
import {auth, db, storage, ref} from '../Firebase/firebase'
import {  useraddid,  useremail, usernik, userlastlogin, userphotourl, authuser,userid,myKey,setImg} from "../Store/datauser";
import auth1 from '@react-native-firebase/auth';
import   uuid from 'react-native-uuid';
import { generateKeyPair }  from '../Component/crypto'

export const Authpage =({navigation}) => {
 
  //const imagesRef = ref(storage, 'images');
 const us = useSelector(state => state.UserId.user)

 const [userdata, Setuserdata] = useState()
 const [loggin, Setlogin] = useState(false)
 const [email, Setemail] = useState("")
 const [pass, Setpass] = useState("")
 //const AuthContext = createContext();
 const dispatch = useDispatch()
 //dispatch(userid('rrr'))
  const goToPage = () =>[
    navigation.navigate('About')
  ]
  const clearData = () =>{
  //  Setemail("")
   // Setpass("")
}

const disp = async(res) =>{
  const rrr = await db.collection("users").doc(res.uid).get().then((doc)=>{
    const r = doc.data();
  //console.log("r: "+r);
    dispatch(userid(r.id))//res
     dispatch(usernik(r.name)) ;
     dispatch(userphotourl(r.avatar)) ;
     dispatch(useremail(r.email));//res
     dispatch(authuser('true'));
     dispatch(myKey(r.publicKey))
     dispatch(setImg(r.image))
   
  }
  )
 
}

 const singin = async() =>{
  await auth.signInWithEmailAndPassword(email, pass)
  .then(res => {
    Setuserdata(res.user)
    const rr = res.user.lastLoginAt
    //console.log("res: "+ res.user)
    disp(res.user)

  }
 
  ).then(navigation.navigate('Profilepage') ).catch(error => console.log(error.message));     
 }

 const singinout = () =>{
  auth.signOut().catch(error => console.log('Error logging out: ', error));
  //Setlogin(false)signOut(auth).catch(error => console.log('Error logging out: ', error));
 }

 const regist = () => {
  navigation.navigate('Registration')

  //clearData()
 } 

    return (
      
<View style={styles.container}>
      
      <View >
       <Image style={styles.img} source={require('../Img/asocseti3.jpg')}/>
      </View>
        <View style={styles.win}>
        <TextInput style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        mode="outlined"
        value={email} onChangeText={(value)=>Setemail(value)}
        
        ></TextInput>
        <TextInput style={styles.input} 
        mode="outlined"
        placeholder="Password" 
        secureTextEntry={true} value={pass} 
        onChangeText={(value)=>Setpass(value)}  ></TextInput>
        <View style={styles.cont}>
        <View >
       <Button title = "Вход" onPress={singin} mode="contained" style={styles.but}>Вход</Button>
        </View>
        <View >
       <Button title = "Регистрация" onPress={regist} mode="contained" style={styles.but3}>Регистрация</Button>
        </View>
        </View>
        <View><Button mode="text" > Забыли пароль?</Button></View>
        <View><Button mode="text" onPress={goToPage}> О программе</Button></View>  
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
    marginTop:'2%',
    width:'70%',
   
  },
  input:{
    marginTop:20,
    width:'99%',
    height:40,
    fontSize:26,
    textAlignVertical: 'top',
    textAlign: 'center'
   
    
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
  }
});

