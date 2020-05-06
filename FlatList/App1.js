import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

export class App1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      page: 1,
      contacts: [],
      allContacts: [],
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    this.setState({
      loading: true,
    });

    const {
      data: {results: contacts},
    } = await axios.get(
      `https://randomuser.me/api/?results=10&page=${this.state.page}`,
    );
    const users = [...this.state.allContacts, ...contacts];

    if (this.state.refreshing) {
      users.reverse();
    }

    this.setState({
      contacts: users,
      allContacts: users,
      loading: false,
      refreshing: false,
    });
  };

  renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <Image style={styles.avatar} source={{uri: item.picture.thumbnail}} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {item.name.first} {item.name.last}
          </Text>
          <Text>{item.location.state}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.state);
    return (
      <SafeAreaView>
        <FlatList
          columnWrapperStyle={{backgroundColor: 'red'}}
          renderItem={this.renderContactsItem}
          keyExtractor={item => item.login.uuid}
          data={this.state.contacts}
          ListEmptyComponent={
            <View>
              <Text>aa</Text>
            </View>
          }
          ListHeaderComponent={
            <View>
              <Text>Header</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }
}

export default App1;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
});
