import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import PlacesItem from './PlacesItem';

export default class Places extends Component {
  render() {
    return (
      <FlatList
        data={this.props.places}
        keyExtractor={(item, key) => item.id.toString()}
        renderItem={({item}) => <PlacesItem map={this.props.map} item={item} />}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{margin: 5}} />}
      />
    );
  }
}
