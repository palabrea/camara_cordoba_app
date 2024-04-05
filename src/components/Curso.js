import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { estilosItem } from '../utils/estilosItems';
import { openUrlInApp } from '../utils/funciones';

// **** DEPENDENCIAS O LIBRERIAS INSTALADAS APARTE CON YARN //
import urlParse from 'url-parse'; //manejar url instalados de yarn
import moment from 'moment'; //manejar fechas instalados de yarn
import es from 'moment/locale/es'; //manejar fechas instalados de yarn

export default function Curso(props) {
  /*console.log("Cursos----");
  console.log(props);*/
  const {
    contenido: {url, titulo, fecha, imagen}
  } = props;

  const abrirURL = () => {
    openUrlInApp(url);
  };

  return (
    <TouchableOpacity
      style={[estilosItem.contenedorNoticiaPrincipal, estilosItem.boxShadow]}
      onPress={abrirURL}>
      <View>
        <Text style={estilosItem.url}>{urlParse(url).host}</Text>
      </View>
      <View style={estilosItem.contenedorNoticiaSecundario}>
        <Image
          style={estilosItem.imagencurso}
          source={{
            uri: imagen,
          }}
          resizeMethod='scale'
        />
        <View style={[estilosItem.noticia]}>
          <Text style={estilosItem.titulo}>{titulo}</Text>
          <Text style={estilosItem.url}>{moment(fecha).local(es).startOf().fromNow()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
