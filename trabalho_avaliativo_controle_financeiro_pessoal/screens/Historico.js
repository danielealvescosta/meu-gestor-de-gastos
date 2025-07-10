
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FIREBASE_URL from '../firebaseConfig';

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';


export default function Historico() {
  const [gastos, setGastos] = useState([]);

  const carregarGastos = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/gastos.json`);
      const data = await res.json();
      const lista = Object.entries(data || {}).map(([id, item]) => ({
        id,
        ...item
      }));
      setGastos(lista);
    } catch (err) {
      console.error('Erro ao buscar gastos:', err);
    }
  };

  const excluirGasto = async (id) => {
    await fetch(`${FIREBASE_URL}/gastos/${id}.json`, {
      method: 'DELETE'
    });
    carregarGastos();
  };

  useFocusEffect(() => {
    carregarGastos();
  }, []);

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text
      style={[
        styles.descricao,
        item.valor >= 0 ? styles.receita : styles.despesa
      ]}
    >
      {item.descricao} - R$ {Math.abs(item.valor).toFixed(2)} ({item.categoria})
    </Text>
    <TouchableOpacity onPress={() => excluirGasto(item.id)}>
      <Text style={styles.excluir}>Excluir</Text>
    </TouchableOpacity>
  </View>
);


  return (
    <View style={styles.container}>
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum gasto registrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  descricao: {
    fontSize: 16
  },
  excluir: {
    color: 'red',
    marginTop: 5
  },
  vazio: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  }, receita: {
  color: 'green'
},
despesa: {
  color: 'red'
}
});
