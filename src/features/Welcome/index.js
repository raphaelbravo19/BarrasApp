import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import screen_names from '../../utils/screenNames';
const categories = ['Ciencias\n&\nIngenieria', 'PUCP', 'ROJIBLANCA', 'VIENTOS'];

class WelcomeScreen extends Component {
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
        {categories.map((x, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.props.navigation.navigate(screen_names.Category, {
                  category: index + 1,
                });
              }}
              style={{
                width: '100%',
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 4,
                  alignItems: 'flex-end',
                  paddingRight: wp * 0.06,
                }}>
                <Image
                  source={require('../../images/logo.png')}
                  style={{width: wp * 0.2, height: wp * 0.2}}
                />
              </View>
              <View style={{flex: 5, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  {x}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default WelcomeScreen;
