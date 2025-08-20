import React, { useState, useEffect } from 'react';
import { Linking, StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

import { getMessaging, subscribeToTopic, getInitialNotification, onMessage, onNotificationOpenedApp, requestPermission } from '@react-native-firebase/messaging';
import { AppState } from 'react-native';
import Contenido from './src/components/Contenido';
import { getNoticiasApi } from './src/api/noticias';
import { getOfertasApi } from './src/api/ofertas';
import { getCursosApi } from './src/api/cursos';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkNotifications, RESULTS } from 'react-native-permissions';

function promptOpenSettingsIfNoLlegan() {
  Alert.alert(
    'Notificaciones desactivadas',
    'Puedes activar las notificaciones del sistema para esta app en Ajustes.',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]
  );
}

export default function App() {
  const [menu, setMenu] = useState("home");

  useEffect(() => {
    const initNotifications = async () => {
      const messaging = getMessaging();

      // Pedimos permisos FCM
      try {
        const authStatus = await requestPermission(messaging);
        console.log("🔔 Estado de permiso:", authStatus);

        if (authStatus === 1 || authStatus === 2) { // AUTHORIZED o PROVISIONAL
          console.log("✅ Permisos concedidos");

          await subscribeToTopic(messaging, "noticias");
          console.log("📌 Suscrito al topic 'noticias'");
        }
      } catch (err) {
        console.error("❌ Error al pedir permisos FCM:", err);
      }

      // 🔍 Verificar si están bloqueadas en ajustes del sistema
      const alreadyAsked = await AsyncStorage.getItem("askedNotificationsOnce");
      if (!alreadyAsked) {
        const { status, settings } = await checkNotifications();
        console.log("🔍 Estado real de notificaciones:", status);

        if (status !== RESULTS.GRANTED) {
          promptOpenSettingsIfNoLlegan();
        }

        await AsyncStorage.setItem("askedNotificationsOnce", "true");
      }

      // App cerrada
      getInitialNotification(messaging).then(remoteMessage => {
        const tipo = remoteMessage?.data?.target;
        if (tipo) cambiarContenido(tipo);
      });

      // App en segundo plano
      const unsubscribeOpened = onNotificationOpenedApp(messaging, remoteMessage => {
        const tipo = remoteMessage?.data?.target;
        if (tipo) cambiarContenido(tipo);
      });

      // App en primer plano
      const unsubscribeForeground = onMessage(messaging, async remoteMessage => {
        const tipo = remoteMessage?.data?.target;
        if (tipo) {
          Alert.alert(
            "Nueva información disponible",
            `Hay nuevas ${tipo}. ¿Quieres verlas?`,
            [
              { text: "Más tarde", style: "cancel" },
              { text: "Ver ahora", onPress: () => cambiarContenido(tipo) }
            ]
          );
        }
      });

      return () => {
        unsubscribeOpened();
        unsubscribeForeground();
      };
    };

    initNotifications();
  }, []);

  const [noticias, setNoticias] = useState(null);
  const [ofertas, setOfertas] = useState(null);
  const [cursos, setCursos] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      switch (menu) {
        case 'noticias':
          const noticiasRes = await getNoticiasApi();
          setNoticias(noticiasRes.data);
          break;
        case 'ofertas':
          const ofertasRes = await getOfertasApi();
          setOfertas(ofertasRes.data);
          break;
        case 'cursos':
          const cursosRes = await getCursosApi();
          setCursos(cursosRes.data);
          break;
      }
      console.log('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const cambiarContenido = (tipo: string) => {
    console.log("🔔 Notificación recibida, cambiando a:", tipo);

    switch (tipo) {
      case 'ofertas':
        getOfertasApi().then(response => setOfertas(response.data));
        break;
      case 'noticias':
        getNoticiasApi().then(response => setNoticias(response.data));
        break;
      case 'cursos':
        getCursosApi().then(response => setCursos(response.data));
        break;
    }
    setMenu(tipo);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera */}
      <View style={styles.cabecera}>
        <TouchableOpacity onPress={() => cambiarContenido('home')}>
          <Image style={styles.logo} source={require('./src/images/logo.png')} />
        </TouchableOpacity>
      </View>

      {/* Contenido central */}
      <View style={styles.contenido}>
        <Contenido
          noticias={noticias}
          ofertas={ofertas}
          cursos={cursos}
          mostrar={menu}
          contenido={cambiarContenido}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => cambiarContenido('noticias')} style={styles.botonFooter}>
          <Image source={require('./src/images/icono_noticias_rojo.png')} style={styles.boton} />
          <Text style={styles.textoBoton}>Noticias</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cambiarContenido('ofertas')} style={styles.botonFooter}>
          <Image source={require('./src/images/icono_empleo_azul.png')} style={styles.boton} />
          <Text style={styles.textoBoton}>Empleo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cambiarContenido('cursos')} style={styles.botonFooter}>
          <Image source={require('./src/images/icono_cursos_naranja.png')} style={styles.boton} />
          <Text style={styles.textoBoton}>Fórmate</Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  cabecera: { paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#bc3440' },
  logo: { width: 130, height: 35, resizeMode: 'contain' },
  contenido: { flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 24, backgroundColor: '#fff' },
  boton: { width: 42, height: 42, resizeMode: 'contain', alignSelf: 'center', marginHorizontal: 15 },
  botonFooter: { alignItems: 'center' },
  textoBoton: { fontSize: 12, marginTop: 4 },
  line: { height: 1.5, flex: 1, backgroundColor: '#bc3440', marginHorizontal: 10 },
});