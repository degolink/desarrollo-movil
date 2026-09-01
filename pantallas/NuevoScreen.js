import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const NuevoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [guardando, setGuardando] = useState(false);

  const guardar = async () => {
    if (!nombre.trim() || !telefono.trim() || !ciudad.trim()) {
      Alert.alert('Campos incompletos', 'Debes completar nombre, teléfono y ciudad.');
      return;
    }

    setGuardando(true);
    try {
      await addDoc(collection(db, 'contactos'), {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        ciudad: ciudad.trim(),
      });
      navigation.navigate('Lista');
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      Alert.alert('Error', 'No se pudo guardar el contacto.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.etiqueta}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <Text style={styles.etiqueta}>Ciudad</Text>
      <TextInput style={styles.input} value={ciudad} onChangeText={setCiudad} />

      <View style={{ height: 12 }} />
      <Button title={guardando ? 'Guardando...' : 'Guardar'} onPress={guardar} disabled={guardando} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  etiqueta: { fontSize: 14, marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
});

export default NuevoScreen;
