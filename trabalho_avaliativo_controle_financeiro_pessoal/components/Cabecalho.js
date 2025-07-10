import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Cabecalho = ({ titulo }) => (
  <Text style={styles.titulo}>{titulo}</Text>
);

const styles = StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});

export default Cabecalho;
