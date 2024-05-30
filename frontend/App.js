import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// importing screens 
import SignInScreen from "./src/screens/signInScreen";
import SignUpOptionsScreen from "./src/screens/signUpOptionsScreen";
import SignUpRiderScreen from "./src/screens/signUpRiderScreen";
import ForgotPasswordScreen from "./src/screens/forgotPassword";
import ResetPasswordScreen from "./src/screens/resetPasswordScreen";
import SignUpDriverScreen from "./src/screens/signUpDriverScreen";
import HomeScreenRider from "./src/screens/homeScreenRider";
import Map from "./src/screens/mapScreen"
import UserAccountScreen from "./src/screens/userAccountScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const loggedIn = await AsyncStorage.getItem('isLoggedIn');
                const role = await AsyncStorage.getItem('userRole');
                console.log(loggedIn);
                console.log(role);
                setIsLoggedIn(loggedIn === "true");
                setUserRole(role);
            } catch (error) {
                console.error('Error retrieving login status or user role:', error);
            }
        };
        getData();
    }, []); // Empty dependency array to run only once on component mount

    let initialRouteName = 'SignIn';
    if (isLoggedIn) {
        if (userRole === 'rider') {
            initialRouteName = 'homeScreenRider';
        }
    }
    
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={Map} // Use initialRouteName variable
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: "#FFFFFF" },
                        }}
                    >
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen
                            name="SignUpOptions"
                            component={SignUpOptionsScreen}
                        />
                        <Stack.Screen
                            name="SignUpRider"
                            component={SignUpRiderScreen}
                        />
                        <Stack.Screen
                            name="SignUpDriver"
                            component={SignUpDriverScreen}
                        />
                        <Stack.Screen
                            name="ForgotPwd"
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name="ResetPassword"
                            component={ResetPasswordScreen}
                        />
                        <Stack.Screen
                            name="HomeScreenRider"
                            component={HomeScreenRider}
                            
                        />
                          <Stack.Screen
                            name="UserAccount"
                            component={UserAccountScreen}
                        />

                        <Stack.Screen
                            name="Map"
                            component={Map}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default App;
