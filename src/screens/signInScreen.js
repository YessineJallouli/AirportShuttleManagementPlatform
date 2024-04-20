import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../../assets/Images/logo_tmp.jpg';
import TypeWriter from 'react-native-typewriter'
import CustomInput from '../components/CustomInput';
import { Button, IconButton, MD3Colors } from 'react-native-paper';

const SignInScreen = ({navigation}) =>{
    return(
        <View style = {styles.parentContainer}>
            <Image source={Logo} style ={styles.logo}/>
            <TypeWriter typing = {1} style = {styles.welcomeText}>Land Anywhere and we'll give you a ride...</TypeWriter>
            <CustomInput name = 'Email' secure = {false}/>
            <CustomInput name = 'password' secure = {true}/>
            <View style = {styles.forgetPwdContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpOptions')}><Text style = {styles.forgetPwdText}>Forgot Password ?</Text></TouchableOpacity>
            </View>
            <Button mode = 'contained-tonal' style = {styles.signInButton} onPress={() => console.log('Pressed')}>
                <Text style = {{color : 'white'}}>Sign In</Text>
            </Button>
            <Text>Or Login With</Text>
            <View style = {{flexDirection : 'row'}}>
                <IconButton icon="facebook" iconColor={MD3Colors.primary20} size = {50} onPress={() => console.log('Pressed')}></IconButton>
                <IconButton icon="google" iconColor={MD3Colors.primary20} size = {50} onPress={() => console.log('Pressed')}></IconButton>
            </View>
            <View style = {{flexDirection : 'row', alignItems: 'center'}}>
                <Text>You don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpOptions')}><Text style = {styles.signUpText}>Sign up</Text></TouchableOpacity>
            </View> 
        </View>
        
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
        width : '80%',
        height : '30%',
    },

    welcomeText : {
        fontSize : 15,
        fontWeight : 'bold',
        marginBottom : 40
        // borderWidth : 1, 
        // borderColor : "black",
    },

    signInButton : {
        backgroundColor : MD3Colors.primary20,
        width : '70%',
        marginBottom : 20

    },

    signUpText : {
        color : MD3Colors.primary30, 
        fontWeight: 'bold'
    }
});

export default SignInScreen;