import { StyleSheet } from 'react-native';

export const estilosItem = StyleSheet.create({
  contenedorNoticiaPrincipal: {
    flexDirection: 'colunm',
    backgroundColor: '#fff',
    padding: 15,
    marginLeft: 10,
    marginRight: 12,
    marginVertical: 8,
    borderRadius: 6,
  },
  contenedorNoticiaSecundario: {
    flexDirection: 'row',
  },
  imagen: {
    width: '25%',
    height: '100%',
  },
  imagencurso: {
    width: '25%',
    height: '100%',
  },
  icono: {
    width: 80,
    height: 80,
  },
  noticia: {
    paddingLeft: 10,
    width: '75%',
  },
  url: {
    paddingBottom: 5,
    color: 'grey',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  subtitulo: {
    fontWeight: 'normal',
  },
  boxShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 16, // Android
  },
});
