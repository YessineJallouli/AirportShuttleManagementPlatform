import React, { useState } from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import TypeWriter from 'react-native-typewriter';
import CustomInput from '../components/CustomInput';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import validatePassword from '../components/validatePassword';
import DatePicker from "../components/DatePicker";

const logo = require('../../assets/Images/logo_tmp.jpg');

const SignUpUserScreen = () =>{
    const [emailValue, setEmail] = useState("");
    const [pwdValue, setPwdValue] = useState("");
    const [confPwdValue, setConfPwdValue] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [pwdMatch, setPwdMatch] = useState(true);
    const [pwdError, setPwdError] = useState("");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return(
        <ScrollView style={{
            flex: 1,
            width: '100%',
            padding: '5%',
        }} contentContainerStyle={{
            alignItems: 'center'}}
        >
            <Image source={logo} style ={styles.logo}/>
            <TypeWriter typing = {1} style = {styles.welcomeText}>Land Anywhere and we'll give you a ride...</TypeWriter>
            <CustomInput name = 'Email' secure = {false} value = {emailValue} setValue = {setEmail}/>
            <View style= {{width: '80%'}}>
                {!emailValid && <Text style = {{fontWeight : 'bold', color : MD3Colors.error40}}>Email is not valid</Text>}
            </View>

            <CustomInput name = 'Full name' secure = {false}/>
            <CustomInput name = 'Password' secure = {true} value = {pwdValue} setValue = {setPwdValue}/>
            <View style= {{width: '80%'}}>
                {pwdError && <Text style = {{fontWeight : 'bold', color : MD3Colors.error40}}>{pwdError}</Text>}
            </View>
            <CustomInput name = 'Confirm Password' secure = {true} value = {confPwdValue} setValue = {setConfPwdValue}/>
            <View style= {{width: '80%'}}>
                {!pwdMatch && <Text style = {{fontWeight : 'bold', color : MD3Colors.error40}}>Password does not match</Text>}
            </View>

            <DatePicker> </DatePicker>

            <Button mode = 'contained-tonal' style = {styles.signUpButton} onPress={() =>{
                setEmailValid(emailRegex.test(emailValue));
                setPwdMatch(pwdValue == confPwdValue);
                const ret = validatePassword(pwdValue);
                if(ret) setPwdError(ret);
            }}>
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
}

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

export default SignUpUserScreen;
