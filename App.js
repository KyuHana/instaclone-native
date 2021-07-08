import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if(token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  const preloadAssets = () => { 
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromise = imagesToLoad.map(image =>
      Asset.loadAsync(image))  
    return Promise.all([...fontPromise, ...imagePromise]);
  };
  if(loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />
  }
  
  return (   
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
