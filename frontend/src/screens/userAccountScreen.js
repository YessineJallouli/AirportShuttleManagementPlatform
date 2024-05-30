// screens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserAccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Account Details Screen</Text>
      {/* Display account details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
