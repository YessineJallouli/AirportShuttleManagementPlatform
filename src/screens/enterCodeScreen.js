import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, MD3Colors} from 'react-native-paper';
import CustomInput from '../components/CustomInput';


const VerificationCodeScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the sent code</Text>
      <CustomInput
          name = 'Enter Code'
          secure = {false}
      />
       <CustomInput
          name = 'Enter new Password'
          secure = {true}
        />
        <CustomInput style= {{marginTop: 20}}
          name = 'Confirm new Password'
          secure = {true}
        />
      <Button mode = "contained-tonal" style = {{marginTop: 20, backgroundColor : MD3Colors.primary20}} onPress = {() => console.log("pressed")}>
        <Text style = {{color : 'white'}}>Reset Password</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default VerificationCodeScreen;
