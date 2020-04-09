import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import Player from './components/player';

class LyricsScreen extends Component {
  state = {
    name: this.props.route.params?.name,
    lyrics: this.props.route.params?.lyrics,
    song: this.props.route.params?.song,
    sound: null,
    playing: false,
    duration: 0,
    playSeconds: 0,
  };
  render() {
    // alert(a.length);
    var wp = Dimensions.get('window').width;
    const {playSeconds, duration} = this.state;

    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp * 0.055,
            fontWeight: '700',
            marginBottom: wp * 0.05,
          }}>
          {this.state.song.toUpperCase()}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp * 0.047,
            fontWeight: '500',
            marginBottom: wp * 0.17,
          }}>
          {this.state.lyrics}
        </Text>
        <Player name={this.state.name} />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{position: 'absolute', top: wp * 0.03, left: wp * 0.04}}>
          <Text
            style={{
              fontSize: wp * 0.05,
              fontWeight: '200',
              letterSpacing: 1.5,
              color: 'rgba(0,0,0,0.7)',
            }}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LyricsScreen;
