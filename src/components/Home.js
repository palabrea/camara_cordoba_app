import { View, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import React from 'react';


export default function Home({ contenido }) {
  const banners = [
    { src: require('../images/banner_noticias_rojo.png'), target: 'noticias' },
    { src: require('../images/banner_empleo_azul.png'), target: 'ofertas' },
    { src: require('../images/banner_cursos_naranja.png'), target: 'cursos' },
  ];

  return (
  <ImageBackground
        source={require('../images/fondo.jpg')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
    <View style={styles.container}>
      
      {banners.map((banner, index) => (
        <TouchableOpacity key={index} onPress={() => contenido(banner.target)}>
          <Image source={banner.src} style={styles.banner} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </View>
      </ImageBackground>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: height * 0.04, // 5% del alto de pantalla
   /* backgroundColor: 'blue',*/
  },

  banner: {
    width: width * 0.9,
    height: height * 0.2,
    marginVertical: height * 0.02, // ligera separación entre imágenes
  },
});

