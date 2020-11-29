/**
 * @format
 */
//react-native-gesture-handler
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

//test Route
// import App from './App';

//App Route
import App from './app/index';

AppRegistry.registerComponent(appName, () => App);
