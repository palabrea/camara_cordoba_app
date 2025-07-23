import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { estilosItem } from '../utils/estilosItems';
import { openUrlInApp } from '../utils/funciones';

// **** DEPENDENCIAS O LIBRERIAS INSTALADAS APARTE CON YARN //
import urlParse from 'url-parse'; //manejar url instalados de yarn
import moment from 'moment'; //manejar fechas instalados de yarn
import es from 'moment/locale/es'; //manejar fechas instalados de yarn

export default function Noticia({ contenido, compartir }) {
    const { url, titulo, fecha, imagen } = contenido;


  const abrirURL = () => {
    openUrlInApp(url);
  };

  return (
    <TouchableOpacity style={styles.noticia} onPress={abrirURL}>
      <Image
        source={{ uri: imagen }}
        style={styles.imagennoticia}
        resizeMode="cover"
      />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.fecha}>{moment(fecha).local(es).startOf().fromNow()}</Text>
      {/* Botón compartir */}
      <TouchableOpacity onPress={() => compartir(titulo, url)} style={styles.botonCompartir}>
        <Image
          source={require('../images/icono_compartir.png')}
          style={styles.iconoCompartir}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noticia: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  imagennoticia: {
    width: '100%',
    aspectRatio: 4 / 3, // Relación horizontal, tipo noticia (ancho : alto)
    borderRadius: 8,
    resizeMode: 'cover',
  },

  titulo: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  fecha: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    fontSize: 12,
    color: '#888',
  },
  
  botonCompartir: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 4,
  },
  iconoCompartir: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});