import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { estilosItem } from '../utils/estilosItems';
import { create } from 'react-test-renderer';

export default function Home(props) {
  const { contenido } = props;
  return (
    <View>
      <TouchableOpacity
        style={estilosBanner.contenedorBanner}
        onPress={() => contenido('noticias')}>
        <View style={estilosBanner.subcontenedorBanner}>
          <Image
            style={estilosBanner.banner}
            source={require('../images/banner_noticias.jpg')}
            resizeMethod="scale"
          />
        </View>
        <View style={estilosBanner.subcontenedorTexto}>
          <Text style={[estilosItem.url, { textAlign: 'right' }]}>
            www.camaracordoba.com
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilosBanner.contenedorBanner}
        onPress={() => contenido('ofertas')}>
        <View style={estilosBanner.subcontenedorBanner}>
          <Image
            style={estilosBanner.banner}
            source={require('../images/banner_ofertas.jpg')}
            resizeMethod="scale"
          />
        </View>
        <View style={estilosBanner.subcontenedorTexto}>
          <Text style={[estilosItem.url, { textAlign: 'right' }]}>
            www.camaraemplea.com
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilosBanner.contenedorBanner}
        onPress={() => contenido('cursos')}>
        <View style={estilosBanner.subcontenedorBanner}>
          <Image
            style={estilosBanner.banner}
            source={require('../images/banner_cursos.jpg')}
            resizeMethod="scale"
          />
        </View>
        <View style={estilosBanner.subcontenedorTexto}>
          <Text style={[estilosItem.url, { textAlign: 'right' }]}>
            www.camaraformaa.com
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const estilosBanner = StyleSheet.create({
  contenedorBanner: {
    paddingTop: 15,
    backgroundColor: 'white',
  },
  subcontenedorBanner: {
    paddingHorizontal: 10,
  },
  subcontenedorTexto: {
    paddingHorizontal: 10,
  },
  banner: {
    width: '100%',
    height: 180,
  },
});
