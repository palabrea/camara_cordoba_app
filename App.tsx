import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Button, View, Image, TouchableOpacity } from 'react-native';

import {
  getMessaging,
  getInitialNotification,
  onMessage,
  onNotificationOpenedApp,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import { AppState } from 'react-native';

import Contenido from './src/components/Contenido';
import { getNoticiasApi } from './src/api/noticias';
import { getOfertasApi } from './src/api/ofertas';
import { getCursosApi } from './src/api/cursos';

import { Alert } from 'react-native';

export default function App() {
  const [menu, setMenu] = useState("home");

  //Para escuchar las notificaiones de Firebase
  useEffect(() => {
    const messaging = getMessaging();

    // App cerrada
    getInitialNotification(messaging).then(remoteMessage => {
      const tipo = remoteMessage?.data?.target;
      if (tipo) {
        cambiarContenido(tipo);
      }
    });

    // App en segundo plano
    const unsubscribeOpened = onNotificationOpenedApp(messaging, remoteMessage => {
      const tipo = remoteMessage?.data?.target;
      if (tipo) {
        cambiarContenido(tipo);
      }
    });

    // App en primer plano
    const unsubscribeForeground = onMessage(messaging, async remoteMessage => {
      const tipo = remoteMessage?.data?.target;
      if (tipo) {
        Alert.alert(
          "Nueva información disponible",
          `Hay nuevas ${tipo}. ¿Quieres verla?`,
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
  }, []);


  const [noticias, setNoticias] = useState(null);
  const [ofertas, setOfertas] = useState(null);
  const [cursos, setCursos] = useState(null);


  const cambiarContenido = (tipo) => {
    console.log("🔔 Notificación recibida, cambiando a:", tipo);
    if (tipo == "ofertas"){
      
    } 
    switch (tipo) {
      case 'ofertas':
        getOfertasApi().then(response => {
          console.log('obteniendo ofertas al cambiar contenido');
          setOfertas(response.data);
        });
        break;
      case 'noticias':
        getNoticiasApi().then(response => {
          console.log('obteniendo noticias al cambiar contenido');
          setNoticias(response.data);
        });
        break;
      case 'cursos':
        getCursosApi().then(response => {
          console.log('obteniendo cursos al cambiar contenido');
          setCursos(response.data);
        });
        break;
    }

    setMenu(tipo);
  };

  return (
    <SafeAreaView>
      <View style={styles.cabecera}>
        <TouchableOpacity 
          style={styles.contenedorBoton}
          onPress={() => {
            cambiarContenido('home');
          }}>
          <Image
            style={styles.logo}
            source={require('./src/images/logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contenedorBoton}
          onPress={() => {
            cambiarContenido('noticias');
          }}>
          <Image
            style={styles.boton}
            source={require('./src/images/icono_noticias.png')}
          />
          <Text style={styles.textoBoton}>Noticias</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contenedorBoton}
          onPress={() => {
            cambiarContenido('ofertas');
          }}>
          <Image
            style={styles.boton}
            source={require('./src/images/icono_empleo.png')}
          />
          <Text style={styles.textoBoton}>Empleo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contenedorBoton}
          onPress={() => {
            cambiarContenido('cursos');
          }}>
          <Image
            style={styles.boton}
            source={require('./src/images/icono_formacion.png')}
          />
          <Text style={styles.textoBoton}>Fórmate</Text>
        </TouchableOpacity>
      </View>
      <Contenido
        noticias={noticias}
        ofertas={ofertas}
        cursos={cursos}
        mostrar={menu}
        contenido={cambiarContenido}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bc3440',
  },
  logo: {
    width: 100,
    height: 27,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  contenedorBoton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  boton: {
    width: 24,
    height: 24,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  textoBoton: {
    fontSize: 12,
  },
  menu: {
    backgroundColor: '#bc3440',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
