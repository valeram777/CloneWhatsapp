import React, {useState, useEffect, useContext, createContext } from "react";
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image, Input} from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { TextInput,  Avatar,  Menu, Button } from 'react-native-paper';
import {  useraddid,  useremail, usernik, setImg,  userphotourl, authuser} from "../Store/datauser";
import {auth, db, storage,  } from '../Firebase/firebase'
import getBlobFromUri from "../Component/BlobFroUri";
import manageFileUpload from "../Component/manageFileUpload";
import * as ImagePicker from "expo-image-picker";
import   uuid from 'react-native-uuid';
import { uploadBytes,ref,uploadBytesResumable,getDownloadURL, deleteObject, refFromURL,getStorage  } from "firebase/storage";


export const Editprofile =({navigation}) => {
 let rt=""
  const dispatch = useDispatch()
 // useState(()=>{
  //  rt = useSelector((state)=>state.UserId)

  //},[])
  rt = useSelector((state)=>state.UserId)
 const rr = rt.avatar 
 const rrrr = rr.indexOf('0f3fbe74-8122-47') // аватарка по умолчанию
 const pic = ""

 
 
  useEffect (() =>{
    db.collection("users").doc(rt.id).onSnapshot((doc) => {
       // console.log("Current data: ", doc.data().image);
        dispatch(setImg(doc.data().image))
    });
    
     },[])


 const [name1, SetName] = useState(rt.nik)
 
 const img = async()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    let filename = result?.assets[0].uri.substring(
      result?.assets[0].uri.lastIndexOf("/") + 1,
      result?.assets[0].uri.length
    );

    delete result.cancelled;
    result = {
      ...result,
      name: filename,
    };
  
    const metadata = {
      contentType: 'image/jpeg'
    };


  // отсюда вставка. Удаляем старую картинку
if(rrrr === -1){

  const st = getStorage()
  const refst = ref(st,`images/${rt.img}` )
  
  deleteObject(refst).then(() => {
   // console.log("Файл " +rt.img+"удалён")
   }).catch((error) => {
   console.log(error)
   
    });
   
    }
  // тут заканчивается


   const filename2 = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/')+1).slice(0,-20)
      const fl=result.assets[0]?.uri
 
   //const rr = uuid.v4()
   const storageRef = ref(storage, `images/${filename2}.jpeg`);
   const link = filename2 + ".jpeg"// название картинки для сохранения в профиле пользователя
   
    // blob = await getBlobFromUri(result.assets[0].uri);
   const imgfrom = await fetch(result.assets[0]?.uri);
   const blob = await imgfrom.blob();
   await uploadBytesResumable(storageRef, blob,metadata)// сохранение картинки в базу


    const r = await getDownloadURL(ref(storage, `images/${filename2}.jpeg`))//ссылка на картинку в базе
   await db.collection("users").doc(rt.id).update({avatar: r})//сохранение ссылки на картинку в профиле юзера
   await db.collection("users").doc(rt.id).update({image: link})
   dispatch(userphotourl(r)) ;
 }}
  
  const savefn = async() =>{
    await db.collection("users").doc(rt.id).update({name: name1})
    dispatch(usernik(name1))
  }

    return (
      <View style={{ flex: 1}}>
         <Text style={styles.pr}>Редактирование профиля</Text>
         <View style={styles.top} >
      <TouchableOpacity onPress={img}>
         <Avatar.Image style={styles.img} size={130} source={{uri: rr}}    />
      </TouchableOpacity>    
    </View>
        <TextInput style={styles.txt} mode="outlined" placeholder="Имя" value={name1} onChangeText={text => SetName(text)}/>
    <View style={styles.cont}><Button title = "Регистрация" mode="contained" style={styles.but3} onPress={savefn}>  Сохранить</Button></View>
  </View>
  )
}
const styles = StyleSheet.create({
  but:{ 
    fontSize:30,
    backgroundColor:'#075bd9',
    color:'#fff'
  },
  pr:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:40,
    textAlign:'center'
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
  txt:{
    fontSize:30,
    marginTop:10,
    width:'80%',
    marginLeft:'11%'
   },
   but3:{
    marginTop:25,
    fontSize:30,
    backgroundColor:'#075bd9',
    color:'#fff',
    width:'40%',
    
      },
    cont:{
        marginTop:20,
        alignItems:'center'
      }
})
