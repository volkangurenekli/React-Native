import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const options = {
  title: 'Please Select',
  customButtons: [
    {name: 'fb', title: 'Facebook'},
    {name: 'ins', title: 'Instagram'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  allowsEditing: true,
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: null,
      loading: false,
      error: null,
    };
  }

  onPress = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.uploadPhoto(response);
      }
    });
  };

  uploadPhoto = async response => {
    this.setState({
      avatarSource: null,
      loading: true,
    });

    const data = new FormData();
    data.append('fileData', {
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'multipart/form-data',
      },
    };

    try {
      const request = await axios.post(
        'http://localhost:3001/upload',
        data,
        config,
      );

      const source = {uri: response.uri};

      this.setState({
        avatarSource: source,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };
  render() {
    const {avatarSource, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {avatarSource && (
            <Image source={avatarSource} style={styles.uploadAvatar} />
          )}
          {loading && <ActivityIndicator size={'small'} />}
          {error && <Text>ERROR</Text>}
        </View>
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text style={styles.button}>Select Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    marginBottom: 30,
    width: 256,
    height: 256,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadAvatar: {
    width: 256,
    height: 256,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#287186',
    fontSize: 30,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
