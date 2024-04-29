import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import SignInScreen from "./src/screens/signInScreen";
import SignUpOptionsScreen from "./src/screens/signUpOptionsScreen";
import SignUpUserScreen from "./src/screens/signUpUserScreen";
import ForgotPasswordScreen from "./src/screens/forgotPassword";
import ResetPasswordScreen from "./src/screens/resetPasswordScreen";
import SignUpDriverScreen from "./src/screens/signUpDriverScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
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
            <Stack.Screen name="SignUpUser" component={SignUpUserScreen} />
            <Stack.Screen name="SignUpDriver" component={SignUpDriverScreen} />
            <Stack.Screen name="ForgotPwd" component={ForgotPasswordScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
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