import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import SignInScreen from './src/screens/signInScreen';
import { PaperProvider,  MD3LightTheme as DefaultTheme, } from 'react-native-paper';

const App = () => {
    return(
        <PaperProvider>
            <SafeAreaView style = {styles.container}>
                <SignInScreen/>
            </SafeAreaView>
        </PaperProvider>
        
    );
}

const styles = StyleSheet.create({
    container : {
       flex : 1
    }
});

export default App;


