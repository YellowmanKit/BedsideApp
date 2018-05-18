import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.1
  },
  hints: {
      width: width * 0.9,
      height: height * 0.9,
      resizeMode: 'contain',
      position: 'absolute',
      top: height * 0.09
  }
});
const textStyles = StyleSheet.create({
  standard: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.04,
    textAlign: 'center',
    margin: width * 0.01,
    color:'black',
  }
});

export default class NfcHint extends Component<{}> {

  render() {
    let nfcMessage =
    this.props.personalInfo ? '於平板電腦後面\n輕拍你的智能手環\n查看你的資訊吧！':
    this.props.eventReserveStatus ? '於平板電腦後面\n輕拍你的智能手環\n以查看留位狀況！':
    this.props.nfcTest ? '於平板電腦後面\n輕拍你的智能手環\n以輸入標籤編號！':
    '';
    return (
      <View style={[viewStyles.container, {backgroundColor:'transparent'}]}>
          <Image source={require('../Images/popup_NFCsignin.png')} style={viewStyles.hints}/>
          <Text style={textStyles.standard}> {nfcMessage} </Text>
      </View>
    );
  }

}
