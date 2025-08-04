import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Usa la API modular para manejar los mensajes en segundo plano
const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('Mensaje recibido en segundo plano:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
