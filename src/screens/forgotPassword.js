import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';
import CustomInput from '../components/CustomInput';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email:</Text>
      <CustomInput
        name = "Email"
        secure = {false} 
      />
       <Button mode = 'contained-tonal' style = {{backgroundColor : MD3Colors.primary20, marginTop : 20}} onPress={() => navigation.navigate("enterCode")}>
                <Text style = {{color : 'white'}}>Send me a verification code</Text>
        </Button>
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
