import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Botao = ({ titulo, onPress }) => (
  <TouchableOpacity style={styles.botao} onPress={onPress}>
    <Text style={styles.texto}>{titulo}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  botao: { backgroundColor: '#0066cc', padding: 10, borderRadius: 5 },
  texto: { color: 'white', textAlign: 'center' }
});

export default Botao;
