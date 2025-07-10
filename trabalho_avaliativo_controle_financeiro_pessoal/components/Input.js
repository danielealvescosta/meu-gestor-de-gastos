import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5 }
});

export default Input;
