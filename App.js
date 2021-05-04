import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeScreen';
import Detail from './DetailScreen';
import Camera from './CameraScreen'

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
          />
         <Stack.Screen
            name="Camera"
            component={Camera}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
// ...