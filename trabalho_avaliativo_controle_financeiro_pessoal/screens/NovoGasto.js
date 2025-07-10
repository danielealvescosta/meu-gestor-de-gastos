import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Cabecalho from '../components/Cabecalho';
import Input from '../components/Input';
import Botao from '../components/Botao';
import FIREBASE_URL from '../firebaseConfig';

export default function NovoGasto() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Alimentação');
  const [tipo, setTipo] = useState('despesa');

  const handleAdicionarGasto = async () => {
    if (!descricao || !valor || !categoria || !tipo) {
      alert('Preencha todos os campos!');
      return;
    }

    let numero = parseFloat(valor);

    if (tipo === 'despesa') {
      numero = -Math.abs(numero);
    } else {
      numero = Math.abs(numero);
    }

    const novoGasto = {
      descricao,
      valor: numero,
      categoria,
      tipo,
      data: new Date().toISOString()
    };

    try {
      await fetch(`${FIREBASE_URL}/gastos.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoGasto)
      });

      alert('Gasto salvo com sucesso!');
      setDescricao('');
      setValor('');
      setCategoria('Alimentação');
      setTipo('despesa');
    } catch (err) {
      console.error('Erro ao salvar gasto:', err);
      alert('Erro ao salvar gasto.');
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho titulo="Novo Gasto" />
      <Input label="Descrição" value={descricao} onChangeText={setDescricao} />
      <Input label="Valor (R$)" value={valor} onChangeText={setValor} />

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.picker}>
        <Picker selectedValue={tipo} onValueChange={(val) => setTipo(val)}>
          <Picker.Item label="Despesa" value="despesa" />
          <Picker.Item label="Receita" value="receita" />
        </Picker>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.picker}>
        <Picker selectedValue={categoria} onValueChange={(val) => setCategoria(val)}>
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Saúde" value="Saúde" />
          <Picker.Item label="Educação" value="Educação" />
          <Picker.Item label="Lazer" value="Lazer" />
          <Picker.Item label="Salário" value="Salário" />
          <Picker.Item label="Renda Extra" value="Renda Extra" />
        </Picker>
      </View>

      <Botao titulo="Adicionar Gasto" onPress={handleAdicionarGasto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10
  }
});
