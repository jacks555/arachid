import 'react-native-gesture-handler';
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Routes from './Router/routes';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#bbb'} />
      <Routes />
    </View>
  )
}

export default App