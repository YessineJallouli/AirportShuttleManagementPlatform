import React, { useState } from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import TypeWriter from 'react-native-typewriter'
import CustomInput from '../components/CustomInput';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import validatePassword from '../components/validatePassword';


const logo = require('../../assets/Images/logo_tmp.jpg');

const SignUpScreen = () =>(
        <ScrollView style={{
            flex: 1,
            width: '100%',
            padding: '5%',
        }} contentContainerStyle={{
            alignItems: 'center'}}
        >
            <Image source={logo} style ={styles.logo}/>
            <TypeWriter typing = {1} style = {styles.welcomeText}>Land Anywhere and we'll give you a ride...</TypeWriter>
            <CustomInput name = 'Email' secure = {false}/>
            <CustomInput name = 'Full name' secure = {false}/>
            <CustomInput name = 'Password' secure = {true}/>
            <CustomInput name = 'Confirm Password' secure = {true}/>

            <Button mode = 'contained-tonal' style = {styles.signUpButton} onPress={() => console.log('Pressed')}>
                <Text style = {{color : 'white'}}>Sign Up</Text>
            </Button>
            <Text>Or Sign Up With </Text>
            <View style = {{flexDirection : 'row'}}>
                <IconButton icon="facebook" iconColor={MD3Colors.primary20} size = {50} onPress={() => console.log('Pressed')}></IconButton>
                <IconButton icon="google" iconColor={MD3Colors.primary20} size = {50} onPress={() => console.log('Pressed')}></IconButton>
            </View>
            <View>
                <Text>You already have an account? <Text style = {styles.signUpText}>Sign In</Text></Text>
            </View>
        </ScrollView>
);

const styles = StyleSheet.create({
    parentContainer :{
        flex : 1,
        alignItems: 'center',
        width : '100%',
        padding : '5%'
    },

    forgetPwdContainer : {
        alignItems: 'flex-end',
        width : '80%',
        marginBottom : 20
    },

    forgetPwdText : {
        color: MD3Colors.error50,
        fontSize : 15
    },

    logo : {
        width : 230,
        height : 230,
    },

    welcomeText : {
        fontSize : 15,
        fontWeight : 'bold',
        marginBottom : 40
        // borderWidth : 1,
        // borderColor : "black",
    },

    signUpButton : {
        backgroundColor : MD3Colors.primary20,
        width : '70%',
        marginTop: 10,
        marginBottom : 20

    },

    signUpText : {
        color : MD3Colors.primary30,
        fontWeight: 'bold'
    }
});

export default SignUpScreen;