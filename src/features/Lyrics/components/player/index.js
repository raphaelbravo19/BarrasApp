import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder,
} from 'react-native';
import Sound from 'react-native-sound';
import Svg, {Polygon} from 'react-native-svg';
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      sound: null,
      playing: false,
      duration: 0,
      playSeconds: 0,
      indicatorX: 0,
      position: 0,
      startX: 0,
    };
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (this.state.playing) {
          this.state.sound.stop();

          clearInterval(this.timeout);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setState({indicatorX: gestureState.dx});

        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderRelease: (evt, gestureState) => {
        //this.setState({indicatorX: 0, playSeconds: this.state.indicatorX});
        var wp = Dimensions.get('window').width;
        var {playSeconds, duration, sound, indicatorX} = this.state;

        var seconds = (duration * indicatorX) / (wp * 0.8 - 85);
        //
        var newPlayseconds =
          playSeconds + seconds < 0
            ? 0
            : playSeconds + seconds > duration
            ? duration
            : playSeconds + seconds;
        this.setState({
          indicatorX: 0,
          playSeconds: newPlayseconds,
        });
        if (this.state.playing) {
          sound.setCurrentTime(newPlayseconds);
          sound.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
          this.setState({playing: true});

          this.timeout = setInterval(() => {
            console.log('active');
            if (sound && sound.isLoaded() && this.state.playing) {
              sound.getCurrentTime((seconds, isPlaying) => {
                this.setState({playSeconds: seconds});
                console.log(seconds);
              });
            }
          }, 100);
        }

        //alert(gestureState.dx);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
    this._panLine = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (this.state.playing) {
          this.state.sound.stop();

          clearInterval(this.timeout);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        //this.setState({indicatorX: 0, playSeconds: this.state.indicatorX});
        var wp = Dimensions.get('window').width;
        var {playSeconds, duration, sound, indicatorX} = this.state;
        var posX = gestureState.moveX - 7.5;

        this.point.measureInWindow(x => {
          var seconds = (duration * (posX - x)) / (wp * 0.8 - 85);
          var newPlayseconds =
            playSeconds + seconds < 0
              ? playSeconds
              : playSeconds + seconds > duration
              ? playSeconds
              : playSeconds + seconds;
          this.setState({
            indicatorX: 0,
            playSeconds: newPlayseconds,
          });
          if (this.state.playing) {
            sound.setCurrentTime(newPlayseconds);
            sound.play(success => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
            this.setState({playing: true});

            this.timeout = setInterval(() => {
              console.log('active');
              if (sound && sound.isLoaded() && this.state.playing) {
                sound.getCurrentTime((seconds, isPlaying) => {
                  this.setState({playSeconds: seconds});
                  console.log(seconds);
                });
              }
            }, 100);
          }
        });

        //

        //alert(gestureState.dx);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }
  componentDidMount() {
    if (this.state.sound == null) {
      var whoosh = new Sound(this.state.name, Sound.MAIN_BUNDLE, error => {
        if (error) {
          //alert('failed to load the sound');
          return;
        }
        this.setState({sound: whoosh, duration: whoosh.getDuration()});
      });
    }
  }
  playSound = () => {
    const {sound, playing, playSeconds} = this.state;
    if (playing) {
      sound.stop();
      this.setState({
        playing: false,
      });
      clearInterval(this.timeout);
      return;
    }
    sound.setCurrentTime(playSeconds);
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    this.setState({playing: true});

    this.timeout = setInterval(() => {
      console.log('active');
      if (sound && sound.isLoaded() && this.state.playing) {
        sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
          console.log(seconds);
        });
      }
    }, 100);
  };
  render() {
    // alert(a.length);
    var wp = Dimensions.get('window').width;
    const {playSeconds, duration, indicatorX, playing} = this.state;
    var firstX =
      -7.5 + (duration == 0 ? 0 : ((wp * 0.8 - 85) * playSeconds) / duration);
    var pivotX =
      indicatorX + firstX < -7.5
        ? -7.5
        : indicatorX + firstX > wp * 0.8 - 92.5
        ? wp * 0.8 - 92.5
        : indicatorX + firstX;
    const triangle = (
      <Svg height="24" width="21">
        <Polygon points="0,0 21,12 0,24" fill="rgba(30,80,200,1)" />
      </Svg>
    );
    const pause = (
      <Svg height="24" width="21">
        <Polygon points="0,0 7,0 7,24 0,24" fill="rgba(30,80,200,1)" />
        <Polygon points="14,0 21,0 21,24 14,24" fill="rgba(30,80,200,1)" />
      </Svg>
    );
    return (
      <View
        style={{
          width: wp * 0.8,
          borderWidth: 1,
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
          flexDirection: 'row',
          borderColor: 'rgba(30,80,200,1)',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={this.playSound}
          style={{
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {playing ? pause : triangle}
        </TouchableOpacity>

        <View
          style={{
            height: 2,
            marginLeft: 15,
            backgroundColor: 'rgba(30,80,200,0.6)',
            width: wp * 0.8 - 85,
          }}>
          <View
            ref={x => (this.line = x)}
            {...this._panLine.panHandlers}
            style={{
              height: 15,
              top: -7.5,
              position: 'absolute',
              width: wp * 0.8 - 85,
            }}
          />
          <View
            ref={x => (this.point = x)}
            {...this._panResponder.panHandlers}
            style={{
              height: 15,
              borderRadius: 10,
              width: 15,
              position: 'absolute',
              top: -7.5,
              left: pivotX,
              backgroundColor: 'rgba(30,80,200,0.5)',
            }}
          />
        </View>
      </View>
    );
  }
}

export default Player;
