import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const ForgotPasswordScreen = ({navigation}) => {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Forgot Password?</Text>

      <Text style={styles.subtitle}>Enter your email:</Text>
      
      <CustomInput
        name = "Email"
        secure = {false} 
      />
      
      <CustomButton
        name= 'Send me a verification code'
        onPress = {() => navigation.navigate("ResetPassword")}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  }
});

export default ForgotPasswordScreen;
