import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Alert
} from 'react-native';
import { estilosItem } from '../utils/estilosItems';
import { openUrlInApp } from '../utils/funciones';

// **** DEPENDENCIAS O LIBRERIAS INSTALADAS APARTE CON YARN //
import urlParse from 'url-parse'; //manejar url instalados de yarn
import moment from 'moment'; //manejar fechas instalados de yarn
import es from 'moment/locale/es'; //manejar fechas instalados de yarn



export default function Oferta({ contenido, compartir }) {
  console.log('📦 Props en Oferta:', { contenido, compartir });
  const { url, titulo, fecha, imagen, estado } = contenido;

  /*console.log(props);*/
  //const { url, titulo, fecha, imagen, estado } = contenido;

  const abrirURL = () => {
    openUrlInApp(url);
  };

  var imagenLocal;
  if (imagen) {
    imagenLocal = {
      uri: imagen,
    };
  } else {
    switch (estado) {
      case 'Abierta':
        imagenLocal = require('../images/icono_ofertaAbierta.png');
        break;
      case 'Enviados':
        imagenLocal = require('../images/icono_ofertaEnviados.png');
        break;
      case 'Finalizada':
        imagenLocal = require('../images/icono_ofertaFinalizada.png');
        break;
      default:
        imagenLocal = require('../images/icono_ofertaAbierta.png');
        break;
    }
  }
  if (typeof compartir !== 'function') {
    console.error('❌ compartir no es función:', compartir);
  }
  return (
    <TouchableOpacity style={styles.oferta} onPress={abrirURL}>      
      <View style={styles.fila}>
        <View style={styles.imagenContainer}>
          <Image source={imagenLocal} style={styles.imagen} />
        </View>
        <View style={styles.texto}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>ESTADO: {estado}</Text>
          <Text style={styles.fecha}>{moment(fecha).local(es).startOf().fromNow()}</Text>
        </View>
        {/* Botón compartir */}
        
        <TouchableOpacity onPress={() => {
                console.log('🔘 Compartir pulsado:', { titulo, url, compartir });
                compartir(titulo, url);
              }
            } style={styles.botonCompartir}>
          <Image
            source={require('../images/icono_compartir.png')}
            style={styles.iconoCompartir}
          />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  oferta: {
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  fila: {
    flexDirection: 'row',
    height: 110, // o el alto que quieras para que la imagen "rellene"
  },
  imagenContainer: {
    width: '30%',
    height: '100%',
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  texto: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 12,
    color: 'gray',
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