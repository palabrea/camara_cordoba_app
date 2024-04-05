import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';
import { estilosItem } from '../utils/estilosItems';
import { openUrlInApp } from '../utils/funciones';

// **** DEPENDENCIAS O LIBRERIAS INSTALADAS APARTE CON YARN //
import urlParse from 'url-parse'; //manejar url instalados de yarn
import moment from 'moment'; //manejar fechas instalados de yarn
import es from 'moment/locale/es'; //manejar fechas instalados de yarn

export default function Oferta(props) {
  /*console.log(props);*/
  const {
    contenido: { url, titulo, fecha, imagen, estado },
  } = props;

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

  return (
    <TouchableOpacity
      style={[estilosItem.contenedorNoticiaPrincipal, estilosItem.boxShadow]}
      onPress={abrirURL}>
      <View>
        <Text style={estilosItem.url}>{urlParse(url).host}</Text>
      </View>
      <View style={estilosItem.contenedorNoticiaSecundario}>
        <Image style={estilosItem.icono} source={imagenLocal} />
        <View style={[estilosItem.noticia]}>
          <Text style={estilosItem.titulo}>{titulo}</Text>
          <Text style={estilosItem.subtitulo}>ESTADO: {estado}</Text>
          <Text style={estilosItem.url}>
            {moment(fecha).local(es).startOf().fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noticia: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  url: {
    paddingBottom: 5,
    color: 'grey',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
