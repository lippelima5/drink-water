import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

//notification
import NotifService from './utils/NotifService';

//screens
import inicio from './inicio';
import Ajustes from './ajustes';
import sobre from './sobre';
import doacao from './doacao';

//functions
import {LoadingScreen} from './utils';

const Stack = createStackNavigator();

// function App() {

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             options={{tabBarVisible: false, headerShown: false}}
//             name="Inicio"
//             component={inicio}
//           />
//           <Stack.Screen
//             // options={{tabBarVisible: false, headerShown: false}}
//             name="Ajustes"
//             component={ajustes}
//           />
//           <Stack.Screen
//             options={{tabBarVisible: false, headerShown: false}}
//             name="Sobre"
//             component={sobre}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// export default App;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  componentDidMount() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{tabBarVisible: false, headerShown: false}}
              name="Inicio"
              component={inicio}
            />
            {/* <Stack.Screen
              // options={{tabBarVisible: false, headerShown: false}}
              name="Ajustes"
              component={Ajustes}
            /> */}
            <Stack.Screen name="Ajustes">
              {(props) => <Ajustes {...props} notif={this.notif} />}
            </Stack.Screen>
            <Stack.Screen
              options={{tabBarVisible: false, headerShown: false}}
              name="Sobre"
              component={sobre}
            />
            <Stack.Screen
              options={{tabBarVisible: false, headerShown: false}}
              name="Doacao"
              component={doacao}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
