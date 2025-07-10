import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import FIREBASE_URL from '../firebaseConfig';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const salvarPerfil = async () => {
    try {
      await fetch(`${FIREBASE_URL}/perfil.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
      });
      alert('Perfil salvo!');
    } catch (err) {
      console.error(err);
    }
  };

  const carregarPerfil = async () => {
    try {
      const res = await fetch(`${FIREBASE_URL}/perfil.json`);
      const data = await res.json();
      if (data) {
        setNome(data.nome || '');
        setEmail(data.email || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.pravatar.cc/150?img=5' }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', margin: 10 }} />
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Salvar Perfil" onPress={salvarPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  label: {
    fontSize: 16,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5
  }
});
