# Parte 1 — Componente teórico

## PREGUNTA 1: Entorno de desarrollo y sistema operativo

### a) Papel que cumple cada pieza del entorno de desarrollo móvil

| Herramienta | ¿Qué papel cumple? |
| :--- | :--- |
| **Node.js y npm** | **Node.js** proporciona el entorno de ejecución para correr JavaScript fuera del navegador en la máquina del desarrollador. **npm** es el gestor de paquetes para instalar, actualizar y administrar las librerías del proyecto (como React Native o React Navigation). |
| **Metro bundler** | Es el empaquetador de JavaScript optimizado para React Native. Compila y empaqueta el código JS/TS y sus recursos en un solo archivo *bundle* para que el motor ejecutor del dispositivo móvil lo procese en tiempo real. |
| **JDK y Android SDK** | El **JDK** provee las herramientas para compilar código Java/Kotlin. El **Android SDK** incluye las bibliotecas, APIs nativas, emuladores y herramientas de línea de comandos (como `adb`) necesarias para compilar y ejecutar apps en Android. |
| **Xcode** | Es el entorno de desarrollo integrado (IDE) exclusivo de Apple. Es indispensable para compilar, empaquetar, firmar, ejecutar en simulador y depurar aplicaciones nativas dirigidas a iOS. |
| **Expo Go** | Es una aplicación cliente para dispositivos móviles (iOS/Android) que permite probar proyectos creados con Expo directamente en hardware real mediante un código QR, sin necesidad de compilar binarios nativos en cada cambio. |

---

### b) Compilación para iOS desde Windows/Linux y alternativas reales

**Explicación:**
Ninguno de los dos puede hacerlo en su propia máquina porque Apple restringe la compilación, empaquetado y firma de aplicaciones para iOS exclusivamente a su herramienta Xcode, la cual requiere ejecutar el sistema operativo macOS. No existen SDKs ni compiladores oficiales de iOS nativos para Windows o Linux.

**Alternativas reales:**
1. **EAS Build (Expo Application Services):** Servicio en la nube de Expo que recibe el código fuente y realiza la compilación nativa en servidores Mac remotos, devolviendo el archivo ejecutable (`.ipa` o build de prueba).
2. **Servidor Mac en la nube / Máquina virtual con macOS:** Alquilar una instancia de macOS remota (por ejemplo, *MacInCloud*) para ejecutar Xcode y compilar desde allí.

---

### c) Variables de entorno y fallos en el emulador de Android

**Explicación:**
Las variables de entorno son dinámicas globales del sistema operativo que le indican a los programas la ubicación de archivos y herramientas clave. Si `ANDROID_HOME` está mal configurada, los scripts de desarrollo no sabrán dónde encontrar las librerías del SDK de Android. Si el `PATH` no incluye las rutas binarias, la consola no podrá ejecutar comandos fundamentales como `adb` o `emulator`, provocando el fallo al iniciar o desplegar en el emulador.

**Diferencia entre variables:**
* **Variable de usuario:** Aplica única y exclusivamente a la cuenta del usuario que inició sesión en el sistema operativo.
* **Variable de sistema:** Aplica de forma global para todos los usuarios, servicios y procesos creados en el sistema operativo.

---

### d) Comparativa: Expo vs. React Native CLI

| Entorno | Ventajas | Limitaciones |
| :--- | :--- | :--- |
| **Expo** | 1. Configuración inicial rápida sin instalar Xcode o Android Studio localmente.<br>2. Facilidad de pruebas instantáneas en dispositivos reales con Expo Go e integración sencilla de *OTA updates*. | 1. Mayor tamaño final del binario compilado.<br>2. Restricción al integrar librerías con módulos nativos C++/Java/Swift no soportados por el ecosistema de Expo (requiere uso de prebuild/eject). |
| **React Native CLI** | 1. Control total sobre el código fuente nativo de Android y iOS.<br>2. Libertad absoluta para vincular módulos nativos personalizados o SDKs propietarios. | 1. Proceso de instalación y configuración inicial complejo y propenso a errores de compatibilidad.<br>2. Requiere obligatoriamente un equipo Mac para compilar la versión de iOS. |

**Criterio de elección:**
Elegiría **Expo** para la mayoría de proyectos, prototipos o aplicaciones con tiempos ajustados donde las API de Expo cubran los requerimientos. Elegiría **React Native CLI** cuando la app requiera integraciones nativas profundas, código C++ personalizado o SDKs propietarios muy específicos que no estén soportados en Expo.

---

## PREGUNTA 2: Fundamentos de React Native

### a) Equivalencia de elementos Web a React Native

| En la web | En React Native |
| :--- | :--- |
| `<div>` | `<View>` |
| `<p>` o `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| Lista larga con scroll | `<FlatList>` |

---

### b) Tres diferencias entre estilos de React Native y CSS tradicional

1. **Sin cascada ni herencia global:** Los estilos en React Native no heredan propiedades CSS a los componentes hijos (salvo en texto anidado dentro de componentes `<Text>`). Se gestionan como objetos JavaScript mediante `StyleSheet.create`.
2. **Unidades de medida sin sufijo:** No se utilizan unidades como `px`, `em` o `rem`. Los números representan puntos independientes de la densidad de pantalla (dp).
3. **Valor por defecto de `flexDirection`:** En React Native el valor predeterminado es `'column'` (a diferencia del CSS web donde es `'row'`). Tiene total sentido en dispositivos móviles porque la orientación física predeterminada es vertical y las interfaces se construyen apilando elementos de arriba hacia abajo.

---

### c) Diferencia entre props y estado

* **Props:** Datos inmutables que un componente recibe de su padre para ser configurado.
* **Estado (`state`):** Información mutable gestionada internamente por el componente que, al modificarse, provoca una nueva renderización de la interfaz.

**Ejemplos en una lista de productos:**
* **Dato como Prop:** El objeto individual del producto (ej. `{ id: 1, nombre: 'Zapatos', precio: 80 }`) enviado desde la pantalla principal a un componente hijo `<TarjetaProducto />`.
* **Dato como Estado:** El texto escrito en la barra de búsqueda de la pantalla (ej. `const [filtro, setFiltro] = useState('')`) o el listado descargado de la base de datos (ej. `const [productos, setProductos] = useState([])`).

---

## PREGUNTA 3: Manejo de pantallas y navegación

### a) Tipos de navegadores y casos de uso

| Navegador | ¿Para qué sirve? | Caso de uso real |
| :--- | :--- | :--- |
| **Stack** | Organiza las pantallas en una pila conceptual donde las nuevas vistas se superponen y permiten regresar en secuencia. | Flujo de compra: Lista de productos → Detalle del producto → Carrito → Confirmación de pago. |
| **Tabs** | Permite cambiar instantáneamente entre secciones principales mediante una barra de pestañas (habitualmente en la parte inferior). | Aplicación principal con pestañas para "Inicio", "Buscar", "Notificaciones" y "Perfil". |
| **Drawer** | Despliega un menú lateral deslizante ("menú hamburguesa") para acceder a distintas secciones de la app. | Aplicación empresarial con menú para "Dashboard", "Inventario", "Reportes" y "Configuración". |

---

### b) Contenedor de navegación (`NavigationContainer`)

El contenedor `NavigationContainer` es el encargado de administrar el estado de navegación global, vincular el historial con el sistema operativo (gestión del botón físico de retroceso) y coordinar la estructura del árbol de navegadores. Debe existir **uno solo en la raíz del proyecto** para mantener una única fuente de la verdad del estado de la navegación y evitar conflictos en el historial.

---

### c) Envío y recepción de parámetros entre pantallas

**Envío:**
```javascript
navigation.navigate('Detalle', { idContacto: 'abc123' });
```

**Recepción:**
```javascript
const { idContacto } = route.params;
```

**Tipo de dato recomendado:** Conviene enviar **únicamente el identificador (ID)**. Enviar el objeto completo consume memoria innecesaria y desactualiza datos si la fuente original cambia entre el envío y la recepción.
