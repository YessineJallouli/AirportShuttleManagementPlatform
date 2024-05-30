// CustomSplashScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>First Mobile App in the World that Provides Shuttle Service</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default CustomSplashScreen;
