import { createSlice } from '@reduxjs/toolkit'
export const Userreducer = createSlice({
  name: 'datauser',
  initialState: {
    isTrue: 'false',
    userid: '',//id Того с кем общаюсь
    email: '',
    nik:'',//displayname
    lastLoginAt: '',
    avatar:'',//фото 
    id:"",
    chat:"",//id чата для общения
    secretKey:"",
    publicKey:"",//публичный ключ человека с которым происходит общение(для шифрования сообщения)
    mypublicKey:"",
    photo:'',//Фото того с кем общаюсь
    usernik:"",//Имя юзера с кем общаюсь
    img: ""// название файла аватарки
  },
  reducers: {
    useraddid: (state, action) =>  {
      state.userid = action.payload
    },
    useremail: (state, action) => {
      state.email = action.payload
    },
    usernik: (state, action) =>{
      state.nik = action.payload
    },
    userlastlogin: (state, action) =>{
      state.lastLoginAt = action.payload
    },
    userphotourl: (state, action) =>{
      state.avatar = action.payload
    },
    authuser: (state, action) =>{
      state.isTrue = action.payload
    },
    userid: (state, action) =>{
      state.id = action.payload
    },
    chatid: (state, action) => {
      state.chat = action.payload
    },
    setskey: (state, action) => {
      state.secretKey = action.payload
    },
    setpkey: (state, action) => {
      state.publicKey = action.payload
    },
    myKey:(state, action) =>{
      state.mypublicKey = action.payload
    },
    setPhuser: (state, action) => {
      state.photo = action.payload
    },
    setNikUser: (state, action) => {
      state.usernik = action.payload
    },
    setImg: (state, action) => {
      state.img = action.payload
    }
  }
})

    export const { useraddid,  useremail, usernik, userlastlogin, userphotourl, authuser, userid, chatid, setskey, setpkey, myKey, setPhuser, setNikUser, setImg} = Userreducer.actions

    export default Userreducer.reducer