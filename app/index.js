import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//screens
import inicio from './inicio';
import ajustes from './ajustes';
import sobre from './sobre';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{tabBarVisible: false, headerShown: false}}
            name="Inicio"
            component={inicio}
          />
          <Stack.Screen
            options={{tabBarVisible: false, headerShown: false}}
            name="Ajustes"
            component={ajustes}
          />
          <Stack.Screen
            options={{tabBarVisible: false, headerShown: false}}
            name="Sobre"
            component={sobre}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
