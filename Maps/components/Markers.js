import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AnimatedMarker from './AnimatedMarker';
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

      markers: [
        {
          latitude: 41.036047,
          longitude: 29.013627,
          title: '1',
          description: 'one',
        },

        {
          latitude: 41.066566,
          longitude: 29.048537,
          title: '2',
          description: 'two',
        },
        {
          latitude: 41.100287,
          longitude: 29.059934,
          title: '3',
          description: 'three',
        },
        {
          latitude: 41.125103,
          longitude: 29.087367,
          title: '4',
          description: 'four',
        },
      ],
    };
  }

  onRegionChange(region) {
    this.setState({region});
  }
  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChange={() => this.onRegionChange}
        style={{flex: 1}}>
        {this.state.markers.map((marker, key) => (
          <Marker
            key={key}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            image={require('../assets/icon.png')}>
            {/* <AnimatedMarker /> */}
          </Marker>
        ))}
      </MapView>
    );
  }
}

export default App;
