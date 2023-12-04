import * as React from 'react';
import { View, Text, Button, Imag,StyleSheet  } from 'react-native';
export const About =() => {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textmy}>Мессенжер для общения со сквозным шифрованием. Автор программы: Мальцев В.И.</Text>
        
      </View>
  )
}//<Text style={StyleSheet.text}>Автор программы: Мальцев В.И.</Text>

const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor:'white'
  },
  textmy: {
    justifyContent: 'center' ,
    fontSize: 14,
    textAlign:'center',
    
    marginTop:'20%'
  },
})