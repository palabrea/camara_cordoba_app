import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { openUrlInApp } from '../utils/funciones';

import urlParse from 'url-parse';
import moment from 'moment';
import es from 'moment/locale/es';

export default function Curso({ contenido, compartir }) {
  const { url, titulo, fecha, imagen } = contenido;

  const abrirURL = () => {
    openUrlInApp(url);
  };

  return (
    <TouchableOpacity style={styles.curso} onPress={abrirURL}>
      <Image
        source={{ uri: imagen }}
        style={styles.imagen}
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
  curso: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    position: 'relative',
  },
  imagen: {
    width: '100%',
    aspectRatio: 2.7 / 4, // vertical tipo cartel
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
