import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import screen_names from '../../utils/screenNames';

class OnboardingScreen extends Component {
  render() {
    const wp = Dimensions.get('window').width;
    const hp = Dimensions.get('window').height;
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../images/logo.png')}
          style={{width: wp * 0.6, height: wp * 0.6}}
        />
        <View style={{height: hp * 0.1}} />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(screen_names.Welcome);
          }}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '60%',
            paddingVertical: 15,
            marginVertical: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OnboardingScreen;
