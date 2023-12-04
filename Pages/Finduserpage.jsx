import React, {useState, useEffect, useContext, createContext } from "react";
import {auth, db,  collection, query, where, getDoc, doc,arrayUnion,setDoc, select, limit,
  serverTimestamp,
  Timestamp,
  updateDoc, } from '../Firebase/firebase'
import { TextInput, Button, Avatar,  Menu } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image, FlatList, Pressable} from "react-native";
import uuid from 'react-native-uuid';
import {getMyPublicKey} from '../Component/crypto'
export const Findeuserpage =({navigation}) => {
  let rt = useSelector((state)=>state.UserId)//UserId
  const [user, Setuser] = useState()//Найденные юзеры
  const [name, Setname] = useState("")
  const [listofchats, SetList] = useState('')
  const[key,SetKey] = useState('')
  const[usermy,Setusermy] = useState([]) // Есть у меня
  //const[usermy,Setusermy] = useState() 
  const [rrrr, Setrrrr] = useState({})
 //SetKey(getMyPublicKey())
 useEffect(()=>{
  SetKey(getMyPublicKey())
 },[])


 
  const poisk = async() =>{

const r = []//Найденные в поиске -> user
const tt = []// все юзеры с которыми я общаюсь -> usermy
    const r1 = (await db.collection("users").where("name", "==", `${name}`).get())// найденные
   // console.log(r1.data().name)
    const r2 = await db.collection("chat").doc(rt.id).get().then((doc)=>{return doc.data()})//те которые уже добавлены
   

    Promise.all([r1,r2]).then(value=>
      {
       
        value[0].forEach((doc) => {
         // console.log(doc.data())
            r.push({
              id: doc.id,
              nik: doc.data().name,
              email: doc.data().email,
              avatar: doc.data().avatar,
              publicKey: doc.data().publicKey
       
      }
        )
     }
    
        ),
        Setuser(r),
        Setusermy(Object.entries(r2))
       
  }
      
     
     
    )
   
    
    }
    useEffect(()=>{
      if (user){
       for(let i=0; i<=user.length-1; i++){
          for(let j=0; j<=usermy.length-1; j++){
             if (user[i].id === usermy[j][1].uid){
              Setuser(user.slice(i,i))
                
             }
          }
       }
      }
          },[usermy])
    
// При выборе найденного юзера происходит создание чата
     const Press = async(props) => {
      const combinedId = rt.id > props.id ? rt.id + props.id : props.id + rt.id;
      const res = await db.collection('Chatrooms').doc(combinedId).get()
      const  res1 =  await db.collection('chat').doc(rt.id).get()
      const res2 = await db.collection('chat').doc(props.id).get()
      res.exists?console.log('Есть') : await db.collection('Chatrooms').doc(combinedId).set({messages:[]})
    
      !res1.exists? (await db.collection('chat').doc(rt.id).set({
        [combinedId]: {
          uid: props.id,
          displayName: props.nik,
          photoURL: props.avatar,
          publicKey: props.publicKey
       }
        
      })) : (await db.collection('chat').doc(rt.id).update({
        [combinedId]: {
          uid: props.id,
          displayName: props.nik,
          photoURL: props.avatar,
          publicKey: props.publicKey
       }
        
      }))

      !res2.exists? (await db.collection('chat').doc(props.id).set({
        [combinedId]: {
          uid: rt.id,
          displayName: rt.nik,
          photoURL: rt.avatar,
          publicKey: rt.mypublicKey
       }
        
      })) : (await db.collection('chat').doc(props.id).update({
        [combinedId]: {
          uid: rt.id,
          displayName: rt.nik,
          photoURL: rt.avatar,
          publicKey: rt.mypublicKey
       }
        
      }))
      navigation.navigate('Chatpage') 
     }

     const Item = (props) =>(
     <>
     <View style={{flex: 1,flexDirection: "row", paddingBottom:10}}>
       <View style={{marginLeft:10}}>
       <Avatar.Image style={styles.img} size={50} source={{uri: props.img}} />
       </View>
       <View>
        <Text style={{fontSize:20,marginLeft:10}}>{props.name}</Text>
       </View>
     </View>
      </>
     )
    // console.log(rt.id)
    return (
      <View style={{ flex: 1, backgroundColor:'white'}}>
      <View style={styles.win}>
      <Text style={styles.pr}>Поиск человека</Text>
      </View>
       <View>
          <TextInput 
          mode="outlined" 
          placeholder="Поиск" 
          style={styles.input}
          value={name} 
          onChangeText={(value)=>Setname(value)}  ></TextInput>
      </View>
      <View style={styles.but}>
          <Button title = "Поиск" mode="contained" style={styles.but3} onPress={poisk}>Поиск</Button>
      </View>
    <FlatList
        style={{ flex: 1}}
        data={user}
       renderItem={({ item }) => <Pressable onPress={()=>{Press(item)}} ><Item id={item.id} name={item.nik} img={item.avatar} publicKey={item.publicKey}/></Pressable>}
        keyExtractor={item => item.id}
     />

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
})