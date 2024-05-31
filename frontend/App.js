import { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashIcon from "./assets/Images/splashIcon.png";

// importing screens
import SignInScreen from "./src/screens/auth/signInScreen";
import SignUpOptionsScreen from "./src/screens/auth/signUpOptionsScreen";
import SignUpRiderScreen from "./src/screens/auth/signUpRiderScreen";
import ForgotPasswordScreen from "./src/screens/auth/forgotPassword";
import ResetPasswordScreen from "./src/screens/auth/resetPasswordScreen";
import SignUpDriverScreen from "./src/screens/auth/signUpDriverScreen";
import HomeScreenRider from "./src/screens/rider/homeScreenRider";
import Map from "./src/screens/rider/mapScreen";
import UserAccountScreen from "./src/screens/userAccountScreen";
import RequestRideScreen from "./src/screens/rider/requestRideScreen";
import HomeScreenDriver from "./src/screens/driver/homeScreenDriver";

const Stack = createNativeStackNavigator();

// Custom splash screen component
const SplashScreen = () => {
    return (
        <View style={styles.splashContainer}>
            <Image source={SplashIcon} style={{ width: 300, height: 250 }} />
            <ActivityIndicator size="large" color="black" />
        </View>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [splashVisible, setSplashVisible] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const loggedIn = await AsyncStorage.getItem("isLoggedIn");
                const role = await AsyncStorage.getItem("userRole");
                console.log(loggedIn);
                console.log(role);
                setIsLoggedIn(loggedIn === "true");
                setUserRole(role);
                setTimeout(() => {
                    setSplashVisible(false);
                }, 3000); // Change delay as needed
            } catch (error) {
                console.error(
                    "Error retrieving login status or user role:",
                    error
                );
            }
        };
        getData();
    }, []);

    let initialRouteName = "HomeScreenDriver";
    if (isLoggedIn) {
        if (userRole === "rider") {
            //initialRouteName = "homeScreenRider";
        }
    }

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                {splashVisible ? (
                    <SplashScreen />
                ) : (
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName={initialRouteName}
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: "#FFFFFF" },
                            }}
                        >
                            <Stack.Screen
                                name="SignIn"
                                component={SignInScreen}
                            />
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
                            <Stack.Screen
                                name="RequestRide"
                                component={RequestRideScreen}
                            />
                            <Stack.Screen
                                name="HomeScreenDriver"
                                component={HomeScreenDriver}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                )}
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    splashContainer: {
        flex: 1,
        backgroundColor: "rgb(241,219,251)",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;
