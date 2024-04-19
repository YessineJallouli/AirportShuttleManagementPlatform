import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import SignInScreen from './src/screens/signInScreen';
import SignUpOptionsScreen from './src/screens/signUpOptionsScreen';
import SignUpUserScreen from "./src/screens/signUpUserScreen";

const App = () => {
    return(
        <PaperProvider>
            <SafeAreaView style = {styles.container}>
                <SignUpUserScreen/>
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