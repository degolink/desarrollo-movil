# RESPUESTAS

## 1. Suscripción en tiempo real

La pantalla `Lista` (`pantallas/ListaScreen.js`) no usa una consulta única
(`getDocs`), sino `onSnapshot(collection(db, 'contactos'), ...)`. Firestore
mantiene abierto un listener: cualquier cambio hecho en la colección
`contactos` — ya sea desde la app o directamente desde la consola de
Firebase — dispara el callback y actualiza el estado `contactos` de React,
reflejándose en la `FlatList` sin recargar la app ni tocar nada más.

## 2. Eliminar un contacto con confirmación

La pantalla `Detalle` (`pantallas/DetalleScreen.js`) incluye un botón
"Eliminar". Al presionarlo se muestra un `Alert.alert` de confirmación con
las opciones "Cancelar" y "Eliminar" (estilo destructivo). Solo si el
usuario confirma se ejecuta `deleteDoc(doc(db, 'contactos', id))` y luego
`navigation.goBack()` para volver a la lista, que se actualiza sola gracias
a la suscripción en tiempo real del punto anterior.

## 3. Tabs con dos secciones (Contactos y Acerca de)

No se aplicó en el código final para mantener la navegación pedida en el
enunciado principal (`Lista` como pantalla inicial de un Stack). Para
implementarlo, la estructura recomendada sería:

- Crear un `createBottomTabNavigator` como raíz post-login.
- La pestaña **Contactos** contendría el `Stack.Navigator` actual
  (`Lista` → `Detalle` / `Nuevo`), de modo que el detalle siga navegando
  dentro de esa pestaña y no como pantalla de nivel superior.
- La pestaña **Acerca de** sería una pantalla simple con información de la
  app (versión, autor, etc.).
- Ejemplo de anidamiento:

  ```jsx
  const ContactosStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Contactos' }} />
      <Stack.Screen name="Detalle" component={DetalleScreen} />
      <Stack.Screen name="Nuevo" component={NuevoScreen} options={{ title: 'Nuevo contacto' }} />
    </Stack.Navigator>
  );

  const RaizTabs = () => (
    <Tab.Navigator>
      <Tab.Screen name="ContactosTab" component={ContactosStack} options={{ title: 'Contactos', headerShown: false }} />
      <Tab.Screen name="AcercaDe" component={AcercaDeScreen} options={{ title: 'Acerca de' }} />
    </Tab.Navigator>
  );
  ```

## 4. Reglas de seguridad de Firestore (lectura pública, escritura restringida)

Regla propuesta para `firestore.rules`, permitiendo lectura pública de la
colección `contactos` pero exigiendo autenticación para crear, modificar o
eliminar documentos:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactos/{contactoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

Esto se configura desde la consola de Firebase, en Firestore Database >
Reglas, o mediante el CLI de Firebase (`firebase deploy --only firestore:rules`)
si el archivo `firestore.rules` se agrega al proyecto.
