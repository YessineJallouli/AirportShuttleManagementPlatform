import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen';
import SignUpOptionsScreen from '../screens/signUpOptionsScreen';
import SignUpRiderScreen from '../screens/signUpRiderScreen';
import ForgotPasswordScreen from '../screens/forgotPassword';
import ResetPasswordScreen from '../screens/resetPasswordScreen';
import SignUpDriverScreen from '../screens/signUpDriverScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignUpOptions" component={SignUpOptionsScreen} />
        <AuthStack.Screen name="SignUpRider" component={SignUpRiderScreen} />
        <AuthStack.Screen name="SignUpDriver" component={SignUpDriverScreen} />
        <AuthStack.Screen name="ForgotPwd" component={ForgotPasswordScreen} />
        <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
);

export default AuthStackNavigator;
