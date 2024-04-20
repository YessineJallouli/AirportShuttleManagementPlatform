import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper';
import SignInScreen from './src/screens/signInScreen';
import SignUpOptionsScreen from './src/screens/signUpOptionsScreen';
import SignUpUserScreen from "./src/screens/signUpUserScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return(
        <PaperProvider>
            <SafeAreaView style = {styles.container}>
            <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false, contentStyle : {backgroundColor : '#FFFFFF'}}}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUpOptions" component={SignUpOptionsScreen} />
            <Stack.Screen name="SignUpUser" component={SignUpUserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
            </SafeAreaView>
        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    }
});

export default App;
