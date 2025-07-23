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
    <SafeAreaView style={styles.container}>
      {/* Cabecera solo con logo */}
      <View style={styles.cabecera}>
      <TouchableOpacity onPress={() => cambiarContenido('home')}>
        <Image
          style={styles.logo}
          source={require('./src/images/logo.png')}
        />
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
        />
      </View>

      {/* Footer con botones */}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecera: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bc3440',
  },
  logo: {
    width: 130,
    height: 35,
    resizeMode: 'contain',
  },
  contenido: {
    flex: 1,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    /*borderTopWidth: 1,
    borderTopColor: '#bc3440',*/
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  boton: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 15,

  },
  botonFooter: {
    alignItems: 'center',
  },
  textoBoton: {
    fontSize: 12,
    marginTop: 4,
  },
  line: {
    height: 1.5,
    flex: 1,
    backgroundColor: '#bc3440',
    marginHorizontal: 10,
  },
});

