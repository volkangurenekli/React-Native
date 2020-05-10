import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Region from './components/Region';
import Markers from './components/Markers';
import CurrentPosition from './components/CurrentPosition';
export class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CurrentPosition />
      </View>
    );
  }
}

export default App;
