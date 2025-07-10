
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Cabecalho from '../components/Cabecalho';
import { PieChart } from 'react-native-chart-kit';
import FIREBASE_URL from '../firebaseConfig';

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';


export default function Resumo() {
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
      console.error('Erro ao carregar gastos no Resumo:', err);
    }
  };

  useFocusEffect(() => {
    carregarGastos();
  }, []);

  const receitas = gastos.filter(g => g.valor > 0).reduce((acc, cur) => acc + cur.valor, 0);
  const despesas = gastos.filter(g => g.valor < 0).reduce((acc, cur) => acc + cur.valor, 0);
  const saldo = receitas + despesas;

  const chartData = [
    {
      name: 'Receitas',
      amount: receitas,
      color: 'green',
      legendFontColor: '#333',
      legendFontSize: 14
    },
    {
      name: 'Despesas',
      amount: Math.abs(despesas),
      color: 'red',
      legendFontColor: '#333',
      legendFontSize: 14
    }
  ];

  return (
    <View style={styles.container}>
      <Cabecalho titulo="Resumo" />
      <Text style={styles.texto}>Receitas: R$ {receitas.toFixed(2)}</Text>
      <Text style={styles.texto}>Despesas: R$ {Math.abs(despesas).toFixed(2)}</Text>
      <Text style={[styles.texto, saldo >= 0 ? styles.positivo : styles.negativo]}>
        Saldo: R$ {saldo.toFixed(2)}
      </Text>

      {gastos.length > 0 && (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={180}
          chartConfig={{
            color: () => `black`
          }}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          absolute
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  texto: { fontSize: 18, marginVertical: 5 },
  positivo: { color: 'green' },
  negativo: { color: 'red' }
});
