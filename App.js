import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import PageDetails from './PageDetails'
import PageList from "./PageList"

const MainNavigator = createStackNavigator({
  List: { screen: PageList },
  Detail: { screen: PageDetails },
});

const App = createAppContainer(MainNavigator)

export default App

/*
export default class App extends React.Component {
  render() {
    return (

      <PageDetails/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/