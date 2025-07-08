import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.configure({
  name: 'RNTSNW App',
  host: '192.168.1.101', // Change to your computer's IP if using physical device
  port: 9090,
})
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-async-storage/async-storage` depending on where you get it from
  .useReactNative() // Add all built-in react-native plugins
  .use(reactotronRedux()) // Redux plugin
  .connect(); // Let's connect!

export default reactotron;
