import React, {Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {API_ENDPOINT, API_KEY} from '../constants';
import axios from 'axios';
import Places from './Places';
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      places: [],
      loading: true,
    };
  }

  async componentDidMount() {
    await Geolocation.getCurrentPosition(info =>
      this.getPlaces(info.coords.latitude, info.coords.longitude),
    );
  }

  async getPlaces(latitude, longitude) {
    const data = await axios.get(
      `${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`,
    );

    this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      places: data.data.results,
      loading: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => (this.map = ref)}
          loadingEnabled={true}
          showsUserLocation={true}
          style={styles.map}
          region={this.state.region.latitude ? this.state.region : null}>
          {this.state.places.map((marker, key) => (
            <Marker
              key={key}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
            />
          ))}
        </MapView>
        <View style={styles.places}>
          {this.state.loading ? (
            <Text style={styles.loading}>Loading nearby places...</Text>
          ) : (
            <Places map={this.map} places={this.state.places} />
          )}
        </View>
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
  places: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loading: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    fontSize: 13,
    color: '#333',
  },
});
