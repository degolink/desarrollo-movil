import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ListaScreen = ({ navigation }) => {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Suscripción en tiempo real: refleja cambios hechos desde la app o desde la consola de Firebase.
    const unsubscribe = onSnapshot(
      collection(db, 'contactos'),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContactos(lista);
        setCargando(false);
      },
      (error) => {
        console.error('Error al leer contactos:', error);
        setCargando(false);
      }
    );

    return unsubscribe;
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detalle', { id: item.id })}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.centrado}>
            <Text>No hay contactos registrados.</Text>
          </View>
        }
      />
      <Button
        title="Agregar contacto"
        onPress={() => navigation.navigate('Nuevo')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  nombre: { fontSize: 18 },
});

export default ListaScreen;
