import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

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

  /*useEffect(() => {
    getNoticiasApi().then(response => {
      //console.log(response.data);
      setNoticias(response.data);
    });

    return () => {};
  }, []);

  //const [ofertas, setOfertas] = useState(null);
  useEffect(() => {
    getOfertasApi().then(response => {
      console.log('obteniendo ofertas');
      setOfertas(response.data);
    });

    return () => {};
  }, []);

  useEffect(() => {
    getCursosApi().then(response => {
      //console.log(response.data);
      setCursos(response.data);
    });

    return () => {};
  }, []);*/

  console.log({mostrar});
  if (mostrar == 'noticias') {
    if (!noticias) return null;

    return (
      <ScrollView style={styles.scrollView} >
        <Text style={styles.title}>Últimas Noticias</Text>
        {map(noticias, (datos) => (
          <Noticia key={datos.id} contenido={datos.attributes} />
        ))}
      </ScrollView>
    );
  } else if (mostrar == 'ofertas') {
    if (!ofertas) return null;

    return (
      <ScrollView style={styles.scrollView} >
        <Text style={styles.title}>Últimas Ofertas de Empleo</Text>
        {map(ofertas, (datos) => (
          <Oferta key={datos.id} contenido={datos.attributes} />
        ))}
      </ScrollView>
    );
  } else if (mostrar == 'cursos') {
    if (!cursos) return null;

    return (
      <ScrollView style={styles.scrollView} >
        <Text style={styles.title}>Últimas Cursos de Formación</Text>
        {map(cursos, (datos) => (
          <Curso key={datos.id} contenido={datos.attributes} />
        ))}
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.scrollView} >
        <Home contenido={contenido} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginLeft: 10,
    marginRight: 12,
    marginBottom: 5,
  },
  scrollView: {
    backgroundColor: '#efefef',
    height: '90%',
  },
});
