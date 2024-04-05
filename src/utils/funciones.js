import React from 'react';
import { Linking, Alert } from 'react-native';
/* Paquete para abrir una URL en la misma aplicacion con un navegador interno */
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

/** openUrl abrir la noticia en el navegador por defecto del movil */
export const openUrlInBrowser = url => {
  //console.log(url);
  Linking.openURL(url);
};

/** openUrl abrir la noticia en la misma aplicacion */
export async function openUrlInApp(url) {
  //console.log(url);
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#bc3440',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      //await this.sleep(800);
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert(error.message);
  }
}
