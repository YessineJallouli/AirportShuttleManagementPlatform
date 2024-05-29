import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import SignInScreen from "./src/screens/signInScreen";
import SignUpOptionsScreen from "./src/screens/signUpOptionsScreen";
import SignUpRiderScreen from "./src/screens/signUpRiderScreen";
import ForgotPasswordScreen from "./src/screens/forgotPassword";
import ResetPasswordScreen from "./src/screens/resetPasswordScreen";
import SignUpDriverScreen from "./src/screens/signUpDriverScreen";
import Map from "./src/screens/mapScreen"
import HomeScreen from "./src/screens/homeUserScreen";
import UserAccountScreen from "./src/screens/userAccountScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="HomeUser"
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
                            name="Map"
                            component={Map}
                        />
                          <Stack.Screen
                            name="HomeUser"
                            component={HomeScreen}
                        />
                          <Stack.Screen
                            name="UserAccount"
                            component={UserAccountScreen}
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