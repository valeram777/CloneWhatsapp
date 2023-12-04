import React, {useState, useEffect, useContext, createContext } from "react";
import {auth, db,  collection, query, where, getDocs, doc, onSnapshot } from '../Firebase/firebase'
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image, FlatList,Pressable, Alert} from "react-native";
import { TextInput, Button, Avatar,  Menu, Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { chatid, setpkey,setPhuser, setNikUser,useraddid } from "../Store/datauser";
export const Chatpage =({navigation}) => {
  const dispatch = useDispatch()
  let rt = useSelector((state)=>state.UserId.id)
  
  const [chats, setChats] = useState([]);
  const[loadPg,Setload] = useState(true)
  const poisk =() =>{

   Setload(false)
   navigation.navigate('Findeuserpage') 

  }
//Тут получаем id чата с юзером и его publicKey. После этого переходим на страницу чата.
  const chatpage = async(props) =>{
    await db.collection(`users`).doc(props[1].uid).get().then(
      doc=>{
        dispatch(chatid(props[0]));
        dispatch(setpkey(props[1].publicKey));
        dispatch(setPhuser(doc.data().avatar));
        dispatch(setNikUser(doc.data().name));
        dispatch(useraddid(props[1].uid))
        navigation.navigate('Chat') 
      }
    )
  }

useEffect(() => {
   const unsub = db.collection('chat').doc(rt).onSnapshot(doc=>setChats(doc.data()))  
return () => {
  unsub();
      };
  rt && unsub();
  }, [loadPg]);

const DeleteMsg = async(chat) =>{
 // console.log(chat[0])
 // await db.collection('Chatrooms').doc(chat[0]).collection('messages').get().then((doc)=>{doc.forEach(d=>{console.log(d.data())
 //   })
 // })
 await db.collection('Chatrooms').doc(chat[0]).collection('messages').get()
  .then(res => {
    res.forEach(element => {
      element.ref.delete();
    })});

}//then((doc)=>{doc.forEach(d=>{console.log(d.data())
const LongPress = (chat) =>{
  //console.log(chat[1].displayName)
 Alert.alert(
  `Удаление чата c`, `${chat[1].displayName}`,[
    {
      text: 'Cancel',
      onPress: () => console.log(chat),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => DeleteMsg(chat)},
  ]
  
 )
}

    return (
      <View style={{ flex: 1, backgroundColor:'white'}}>
      <View style={styles.win}>
      <Text style={styles.pr}>Чаты</Text>
      </View>
      <View style={styles.but}>
          <Button title = "Поиск" mode="contained" style={styles.but3} onPress={poisk}>Поиск</Button>
      </View>
      <View>
      {chats?Object.entries(chats).map((chat)=>(
        <TouchableOpacity key={chat[1].uid} onPress={()=>chatpage(chat)}>
            <View key={chat[1].uid} style={styles.card} >
                <Pressable key={chat[1].uid} delayLongPress={200} onLongPress={()=>LongPress(chat)}>
                     <Avatar.Image style={styles.img} size={50} source={{uri: chat[1].photoURL}}  />
                </Pressable> 
            <View> 
                 <Text style={{fontSize:20, marginLeft:5}}>{chat[1].displayName}</Text>
            </View>
             
            </View>
        </TouchableOpacity> 
   )):null}
      </View>
  </View>
  )
}  
const styles = StyleSheet.create({
  win:{
    marginLeft:'15%',
     marginTop:'7%',
     width:'70%',
     textAlign:"center",
   },
   pr:{
    marginTop: 10,
    fontSize:20,
    fontWeight:'bold',
   marginLeft:'10%'
  },
  but3:{
    marginTop:5,
    fontSize:10,
    backgroundColor:'#075bd9',
    color:'#fff',
    width:'45%',
    
      },
  but:{
    marginLeft:'34%'
  },
  input:{
    marginTop:20,
    width:'95%',
    height:10,
    height:50,
    fontSize:20,
    marginLeft:10,
    padding:0,
   
  },
  img:{
    marginTop: 10, 
    marginLeft:10
  },
  card:{
    height:70,
    width:'95%',
    backgroundColor:'#fcfafa',
    borderRadius:10,
    marginLeft:'2%',
    marginTop:'2%',
    flexDirection:'row'
  }
})