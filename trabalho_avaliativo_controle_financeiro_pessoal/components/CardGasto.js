import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardGasto = ({ descricao, valor, categoria }) => (
  <View style={[styles.card, valor >= 0 ? styles.ganho : styles.perda]}>
    <Text>{descricao}</Text>
    <Text>R$ {valor}</Text>
    <Text>{categoria}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 10, marginVertical: 5, borderRadius: 5 },
  ganho: { backgroundColor: '#d4edda' },
  perda: { backgroundColor: '#f8d7da' }
});

export default CardGasto;
