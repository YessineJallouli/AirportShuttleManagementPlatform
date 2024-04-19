import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Picker } from 'react-native';
import Logo from '../../assets/logo_tmp.jpg';
import TypeWriter from 'react-native-typewriter';
import CustomInput from '../components/CustomInput';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import picker from '@react-native-picker/picker';
 
const SignUpScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Function to handle signup button press
  const handleSignUp = () => {
    // Validate and process the signup data
    console.log('Signing up...');
  };

  return (
    <View style={styles.parentContainer}>
      <Image source={Logo} style={styles.logo} />
      <TypeWriter typing={1} style={styles.welcomeText}>
        Join Us and Start Riding Anywhere...
      </TypeWriter>
      {/* Birthday Input */}
      <View style={styles.birthdayContainer}>
        <Picker
          style={styles.birthdayPicker}
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}>
          <Picker.Item label="Day" value="" />
          {/* Add day options */}
          {Array.from({ length: 31 }, (_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        <Picker
          style={styles.birthdayPicker}
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}>
          <Picker.Item label="Month" value="" />
          {/* Add month options */}
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          {/* Add other months */}
        </Picker>
        <Picker
          style={styles.birthdayPicker}
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}>
          <Picker.Item label="Year" value="" />
          {/* Add year options */}
          {Array.from({ length: 100 }, (_, i) => (
            <Picker.Item key={i} label={`${new Date().getFullYear() - i}`} value={`${new Date().getFullYear() - i}`} />
          ))}
        </Picker>
      </View>
      {/* End of Birthday Input */}
      <CustomInput name="Email" secure={false} />
      <CustomInput name="Password" secure={true} />
      <CustomInput name="Confirm Password" secure={true} />
      <Button mode="contained-tonal" style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </Button>
      <Text>Or Sign Up With</Text>
      <View style={{ flexDirection: 'row' }}>
        <IconButton icon="facebook" iconColor={MD3Colors.primary20} size={50} onPress={() => console.log('Pressed')} />
        <IconButton icon="google" iconColor={MD3Colors.primary20} size={50} onPress={() => console.log('Pressed')} />
      </View>
      <View>
        <Text>Already have an account? <Text style={styles.signInText}>Sign in</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: '5%',
  },

  logo: {
    width: '80%',
    height: '30%',
  },

  welcomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  birthdayContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  birthdayPicker: {
    flex: 1,
    height: 50,
  },

  signUpButton: {
    backgroundColor: MD3Colors.primary20,
    width: '70%',
    marginBottom: 20,
  },

  signInText: {
    color: MD3Colors.primary30,
    fontWeight: 'bold',
  }
});

export default SignUpScreen;
