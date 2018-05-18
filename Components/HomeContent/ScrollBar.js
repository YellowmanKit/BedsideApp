import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';

const viewStyles = StyleSheet.create({
  scrollBar: {
    flex: 0.05,
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
    resizeMode: 'cover'
  },
  bar: {
    position:'absolute',
    resizeMode:'stretch',
    right:2,
    width: Dimensions.get('window').width * 0.012
  }
});

export default class ScrollBar extends Component<{}> {

  render() {
    if(this.props.toRender){
      let h = this.props.barHeight;
      let p = this.props.barPosi * (Dimensions.get('window').height - h) ;
      return (
        <View style={viewStyles.scrollBar}>
          <Image source={require('../Images/scrollbar_bg.png')} style={viewStyles.bg} />
          <Image source={this.props.barImg} style={[viewStyles.bar, {top:p, height: h}]} />
        </View>
      );
    }
    return (
      <View style={viewStyles.scrollBar}>
      </View>
    );
  }

}
