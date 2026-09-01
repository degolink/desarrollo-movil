// NavegacionStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListaScreen from '../pantallas/ListaScreen';
import DetalleScreen from '../pantallas/DetalleScreen';
import NuevoScreen from '../pantallas/NuevoScreen';
const Stack = createStackNavigator();
const NavegacionStack = () => {
 return (
 <Stack.Navigator initialRouteName="Lista" screenOptions={{
headerShown: true }}>
 <Stack.Screen name="Lista" component={ListaScreen} options={{
title: 'Contactos' }} />
 <Stack.Screen name="Detalle" component={DetalleScreen} options={{
title: 'Detalle' }} />
 <Stack.Screen name="Nuevo" component={NuevoScreen} options={{
title: 'Nuevo contacto' }} />
 </Stack.Navigator>
 );
};
export default NavegacionStack;
