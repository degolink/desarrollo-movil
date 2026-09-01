import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DetalleScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [contacto, setContacto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarContacto = async () => {
      try {
        const referencia = doc(db, 'contactos', id);
        const snapshot = await getDoc(referencia);
        if (snapshot.exists()) {
          setContacto({ id: snapshot.id, ...snapshot.data() });
        } else {
          setContacto(null);
        }
      } catch (error) {
        console.error('Error al leer el contacto:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarContacto();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({ title: contacto ? contacto.nombre : 'Detalle' });
  }, [navigation, contacto]);

  const eliminarContacto = () => {
    Alert.alert(
      'Eliminar contacto',
      `¿Seguro que deseas eliminar a ${contacto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'contactos', id));
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar el contacto:', error);
              Alert.alert('Error', 'No se pudo eliminar el contacto.');
            }
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.contenedor}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!contacto) {
    return (
      <View style={styles.contenedor}>
        <Text>Contacto no encontrado.</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.campo}>Nombre: {contacto.nombre}</Text>
      <Text style={styles.campo}>Teléfono: {contacto.telefono}</Text>
      <Text style={styles.campo}>Ciudad: {contacto.ciudad}</Text>
      <Button title="Eliminar" color="#c0392b" onPress={eliminarContacto} />
      <View style={{ height: 8 }} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  campo: { fontSize: 18, marginBottom: 8 },
});

export default DetalleScreen;
