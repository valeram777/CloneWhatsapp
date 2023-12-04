//import * as React from 'react';useRef

import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect, useContext, createContext, useCallback,  useLayoutEffect, useRef } from "react";
import {StyleSheet, Text, View,LogBox, TouchableOpacity,  Image, FlatList, Pressable, } from "react-native";
import {auth, db,  collection, query, where, getDoc, doc,arrayUnion,setDoc, select, limit,onSnapshot,orderBy,
  serverTimestamp,Timestamp, get,
  updateDoc, addDoc} from '../Firebase/firebase';
  import {  useraddid,  useremail, usernik, userlastlogin, userphotourl, authuser,userid,myKey, setskey} from "../Store/datauser";
import { TextInput, Button, Avatar,  Menu } from 'react-native-paper';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import { generateKeyPair }  from '../Component/crypto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { box } from "tweetnacl";
import {
  encrypt,
  decrypt,
  stringToUint8Array,
  getMySecretKey
} from '../Component/crypto'

export const Chat =() => {
  //useEffect(() => {
  ////  Kkey()
//readKey().then(SetLoading(true))//Считывание секретного ключа из памяти для кодирования сообщения.
    
  //},[]);

  let rt = useSelector((state)=>state.UserId)
  const [messages2, setMessages] = useState([]);
  const [messages5, setMessages2] = useState([]);
  const [secretKey, SetSecret] = useState('') // Мой секретный ключ
  const [sharedKey, SetsharedKey] = useState('') // Ключ для шифрования
  const [isLoading, SetLoading] = useState(true)
  const [counter, setCounter] = useState(0)
  const [rt1, StRt] = useState('') // Копия RT
  const [publicKey, Setpublic] = useState('') // хранит публичный ключ того с кем общаюсь

  const ff = async()=>{
    await db.collection("chat").doc(rt.id).update({
      [rt.chat]:{
        uid: rt.userid,
          displayName: rt.usernik,
          photoURL: rt.photo,
          publicKey: rt.publicKey
      }
    })
    }

    useEffect (()=>{
      ff()
    },[])

     useEffect (() =>{
            const unsub =  db.collection('Chatrooms').doc(rt.chat).collection('messages').orderBy('createdAt', 'desc')
            .onSnapshot(snapshots => {setMessages2(snapshots.docs.map((doc) => (
               {
                 _id: doc.data()._id,
                 createdAt: doc.data().createdAt.toDate(),
                 text: doc.data().text,
                 user: doc.data().user,
               }
                   )
                       )
                  );
              }
              );
      return () => unsub();
     },[])
      
 
     const onSend = (msgArray) => {
      if (sharedKey){
     const encryptedMessage = encrypt(sharedKey, msgArray[0].text );
     const msg = msgArray[0]
     msg.text = encryptedMessage
     const usermsg = {
       ...msg,
       sentBy: rt.id,
     }
    
     //previousMessages => GiftedChat.append(previousMessages, usermsg)
     db.collection('Chatrooms').doc(rt.chat).collection('messages').add({...usermsg})
      }
    }


 

    useEffect(() => { 
      const decryptMessage = async () => {
        const myKey = await getMySecretKey();
        SetSecret(myKey)
        const sharedKey2 = await box.before(stringToUint8Array(rt.publicKey), myKey);//(box.before( stringToUint8Array(rt.publicKey), stringToUint8Array(secretKey)
       SetsharedKey(sharedKey2)
     if (sharedKey){
      let ff = [];
      messages5.map(doc=>{ 
       // console.log(doc)
       doc.text = decrypt(sharedKey, doc.text)
       doc.user.avatar = rt.photo
        doc.user.name = rt.usernik
        ff.push(doc)
      })
      setMessages(ff)
     }
      };
  
      decryptMessage();
      //sharedKey&&decod()
      //console.log("Ключ шифрования :"+sharedKey)
     },[messages5]); 
 

  


    return (
      <View style={{ flex: 1, marginTop:22 }} >
    {isLoading?  <View style={{ flex: 1, marginTop:22 }} >
        <GiftedChat
          messages={messages2}
          showAvatarForEveryMessage={true}
          onSend={text => onSend(text)}
           scrollToBottom
         user={{ 
                 _id: rt.id,
                name: rt.nik,
                 avatar: rt.avatar,
                }}/>
      </View>
    :<View><Text>Загрузка</Text></View>}
      </View>
    )
  }

