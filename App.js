/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Home from './screens/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CINEMA"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'orange',
            },

            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={styles.header}>
                <Image
                  style={styles.logo}
                  resizeMode="cover"
                  resizeMethod="resize"
                  source={require('./asset/img/logo.png')}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
});
export default App;
