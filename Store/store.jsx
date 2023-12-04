import * as React from 'react';
import { View, Text, Button, Image  } from 'react-native';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Userreducer from './datauser'

const store =  configureStore({
  reducer: {
    UserId: Userreducer
  }
}) 
export default store