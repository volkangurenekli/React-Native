import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, SafeAreaView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class CurrentPosition extends Component {
  state = {
    region: {
      latitude: 41.06,
      longitude: 29.05,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    position: undefined,
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

  async componentDidMount() {
    await setTimeout(() => {
      this.getCurrentPosition();
    }, 3000);
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition(info =>
      this.setState({
        region: {
          ...this.state.region,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
        position: `Long:${info.coords.longitude} Lat:${info.coords.latitude}`,
      }),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          loadingEnabled={true}
          showsUserLocation={true}
          style={styles.map}
          region={this.state.region}>
          {this.state.position === undefined ? null : (
            <SafeAreaView style={styles.safeArea}>
              <Text style={styles.text}>{this.state.position}</Text>
            </SafeAreaView>
          )}

          {this.state.markers.map((marker, key) => (
            <Marker
              key={key}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              image={require('../assets/icon.png')}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
  safeArea: {},
  text: {
    backgroundColor: '#aee1f5',
    padding: 5,
    marginVertical: 5,
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
  },
});
