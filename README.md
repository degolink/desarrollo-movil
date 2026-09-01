# MiBiblioteca

**Autor:** Diego Arboleda Flórez
**Sistema operativo utilizado:** Windows

## Descripción

Aplicación móvil hecha con Expo (React Native) que gestiona una lista de
contactos usando Firebase (Auth + Firestore). Permite listar contactos,
ver el detalle de uno, crear nuevos y eliminarlos, todo con datos en
tiempo real desde Firestore.

## Requisitos previos

- Node.js LTS instalado.
- Cuenta de Firebase con un proyecto creado, Authentication (correo/contraseña
  si aplica) y Firestore habilitados.
- App Expo Go instalada en el dispositivo físico, o un emulador Android/iOS
  configurado.

## Configuración

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia el archivo de ejemplo de variables de entorno y complétalo con
   las credenciales de tu proyecto de Firebase (Configuración del proyecto
   > Tus apps > SDK de Firebase):

   ```bash
   cp .env.example .env
   ```

   Luego edita `.env` y llena cada variable (`EXPO_PUBLIC_FIREBASE_API_KEY`,
   etc.). Estas variables se inyectan en el bundle porque tienen el prefijo
   `EXPO_PUBLIC_`.

4. En la consola de Firebase, crea la colección `contactos` en Firestore
   (puede crearse vacía; la app la puebla al guardar el primer contacto,
   o puedes crear documentos de ejemplo manualmente con los campos
   `nombre`, `telefono` y `ciudad`).

## Ejecución

```bash
npx expo start
```

Escanea el código QR con la app Expo Go en tu dispositivo físico, o pulsa
`a` / `i` en la terminal para abrir un emulador Android/iOS.

## Estructura relevante

- `App.js`: punto de entrada, decide entre `AuthStack` y `NavegacionStack`.
- `navegacion/NavegacionStack.js`: Stack Navigator con las pantallas
  Lista, Detalle y Nuevo.
- `pantallas/ListaScreen.js`: lista de contactos desde Firestore
  (suscripción en tiempo real con `onSnapshot`).
- `pantallas/DetalleScreen.js`: detalle de un contacto por `id`,
  con opción de eliminar.
- `pantallas/NuevoScreen.js`: formulario para crear un contacto nuevo
  en Firestore.
- `firebaseConfig.js`: inicialización de Firebase leyendo variables de
  entorno.

## Notas

- Las credenciales de Firebase no están versionadas: se gestionan por
  variables de entorno en un archivo `.env` (ignorado por Git).
- Ver `RESPUESTAS.md` para las respuestas a los retos opcionales.
