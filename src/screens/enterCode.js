import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const VerificationCodeScreen = () => {
  const [code, setCode] = useState('');

  const handleSubmitCode = () => {
    // Here you can implement the logic to validate and submit the code
    console.log('Submitted code:', code);
    // You can add logic to handle the submitted code here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the sent code</Text>
      <View style={styles.codeInputContainer}>
        <TextInput
          style={styles.codeInput}
          keyboardType="numeric"
          maxLength={6}
          value={code}
          onChangeText={text => setCode(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmitCode}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationCodeScreen;
