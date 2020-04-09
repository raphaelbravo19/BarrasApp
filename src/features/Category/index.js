import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import screen_names from '../../utils/screenNames';
const cant = 30;
const songs = {
  '1': ['Hola\nComo Estas', 'Bien\nY tu', 'Que\nEstas Haciendo'],
};
const songsNames = {
  '1': ['Saludo', 'Pregunta', 'Cuestion'],
};
class CategoryScreen extends Component {
  state = {
    category: this.props.route.params?.category,
  };
  render() {
    var wp = Dimensions.get('window').width;
    // alert(a.length);
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView
          style={{flex: 1, width: '100%', marginTop: wp * 0.13}}
          contentContainerStyle={{alignItems: 'center'}}>
          {Array.from(Array(cant).keys()).map((x, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate(screen_names.Lyrics, {
                    name: `${this.state.category}-${index}.mp3`,
                    lyrics: songs[`${this.state.category}`][index],
                    song: songsNames[`${this.state.category}`][index],
                  })
                }
                style={{
                  width: '80%',
                  paddingVertical: 15,
                  marginBottom: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}>
                <Text style={{color: 'white'}}>
                  SEE {this.state.category}-{index}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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

export default CategoryScreen;
