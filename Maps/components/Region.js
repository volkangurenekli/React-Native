import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import MapView from 'react-native-maps';
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 41.066566,
        longitude: 29.048537,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        region: {
          latitude: 41.066566,
          longitude: 29.048537,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        },
      });
    }, 3000);
  }

  render() {
    return (
      <MapView
        style={{flex: 1}}
        initialRegion={this.state.region}
        region={this.state.region}
      />
    );
  }
}

export default App;
