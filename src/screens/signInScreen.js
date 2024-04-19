import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Logo from '../../assets/logo_tmp.jpg';
import TypeWriter from 'react-native-typewriter'
import CustomInput from './CustomInput';

const SignInScreen = () =>{
    return(
        <View style = {{flex : 1, borderColor : 'black', borderWidth : 1, alignItems: 'center', width : '100%', padding : '5%'}}>
            <Image source={Logo} style ={styles.logo}/>
            <TypeWriter typing = {1} style = {styles.text}>Land Anywhere and we'll give a ride...</TypeWriter>
            <CustomInput name = 'Email' secure = {false}/>
            <CustomInput name = 'password' secure = {true}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    logo : {
        width : '80%',
        height : '30%',
    },

    text : {
        fontSize : 15,
        fontWeight : 'bold',
        marginBottom : 20
        // borderWidth : 1, 
        // borderColor : "black",
    }
});

export default SignInScreen;