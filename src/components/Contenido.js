import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet,Image, Share } from 'react-native';

// *** LIBRERIAS AÑADIDAS CON  YARN *********************
import { map } from 'lodash'; //motrar bloques de la api (noticias, ofertas,..)

// *** LIBRERIAS CREADAS **************************
import Home from '../components/Home';
import Noticia from '../components/Noticia';
import { getNoticiasApi } from '../api/noticias';
import Oferta from '../components/Oferta';
import { getOfertasApi } from '../api/ofertas';
import Curso from '../components/Curso';
import { getCursosApi } from '../api/cursos';


export default function Contenido(props) {
  const { noticias, ofertas, cursos, mostrar, contenido } = props;

  const compartir = async (titulo, url) => {
    try {
      await Share.share({
        message: `📢 ${titulo}\n${url}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el contenido');
    }
  };


  const secciones = {
    noticias: {
      color: '#c6002d',
      titulo: 'NOTICIAS',
      icono: require('../images/icono_blanco_noticias.png'),
    },
    cursos: {
      color: '#e2890c',
      titulo: 'FÓRMATE',
      icono: require('../images/icono_blanco_formacion.png'),
    },
    ofertas: {
      color: '#1270c7',
      titulo: 'EMPLEO',
      icono: require('../images/icono_blanco_empleo.png'),
    },
  };

  const cabecera = secciones[mostrar];

  console.log({mostrar});
  
  if (mostrar === 'home') {
    return (
      <ScrollView style={styles.scrollView}>
        <Home contenido={contenido} />
      </ScrollView>
    );
  }

  const items = mostrar === 'noticias' ? noticias
              : mostrar === 'ofertas' ? ofertas
              : mostrar === 'cursos' ? cursos
              : null;

  const ItemComponent = mostrar === 'noticias' ? Noticia
                      : mostrar === 'ofertas' ? Oferta
                      : Curso;

  if (!items) return null;

   // 🔸 Para dividir en filas de 2 elementos
  const chunk = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <ScrollView style={styles.scrollView}>
      {cabecera && (
        <View style={[styles.franja, { backgroundColor: cabecera.color }]}>
          <Image source={cabecera.icono} style={styles.icono} />
          <Text style={styles.titulo}>{cabecera.titulo}</Text>
        </View>
      )}

      {mostrar === 'cursos' || mostrar === 'noticias' ? (
        <View style={styles.grid}>
          {chunk(items, 2).map((fila, filaIndex) => (
            <View key={filaIndex} style={styles.fila}>
              {fila.map((item) => {
                const Item = ItemComponent;
                return <Item key={item.id} contenido={item.attributes} compartir={compartir} />;
              })}
            </View>
          ))}
        </View>
      ) : (
        map(items, (datos) => {
          const Component = mostrar === 'ofertas' ? Oferta : ItemComponent;
          return (
            <Component
              key={datos.id}
              contenido={datos.attributes}
              compartir={compartir}
            />
          );
        })
      )}
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  franja: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  icono: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 8,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  grid: {
    paddingHorizontal: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
