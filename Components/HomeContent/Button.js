import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const viewStyles = StyleSheet.create({
});
const textStyles = StyleSheet.create({
});

export default class Button extends Component<{}> {

  render() {
    return (
        <TouchableOpacity style={this.props.btnProps.style.btnArea} onPress={this.props.buttonPressed}>
          <Image style={this.props.btnProps.style.btnImg} source={this.props.btnProps.img}/>
          <Text style={this.props.btnProps.style.btnText}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }

}
