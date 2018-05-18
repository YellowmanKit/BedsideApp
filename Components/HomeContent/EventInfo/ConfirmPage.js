import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Button from '../Button';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.05
  },
  area: {
      width: width * 1,
      height: height * 1,
      resizeMode: 'contain',
      position: 'absolute',
      top: height * 0.035
  },
  buttonRow: {
      width: width * 0.7,
      height: height * 0.25,
      position: 'absolute',
      top: height * 0.65,

      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'transparent'
  }
});
const textStyles = StyleSheet.create({
  standard: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.04,
    textAlign: 'center',
    margin: width * 0.01,
    color:'black'
  }
});

export default class ConfirmPage extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      confirmReserve: false,
      confirmCancelReserve: false
    }
  }

  reserveCancelButtonPressed(){
    if(this.state.confirmReserve || this.state.confirmCancelReserve){
      this.setState({
        confirmReserve: false,
        confirmCancelReserve: false
      })
      this.props.confirmedReserve(this.state.confirmReserve);
    }else{
      this.setState({
        confirmReserve: !this.props.reserved,
        confirmCancelReserve: this.props.reserved
      })
    }
  }

  backButtonPressed(){
    if(this.state.confirmReserve || this.state.confirmCancelReserve){
      this.setState({
        confirmReserve: false,
        confirmCancelReserve: false
      })
    }else{
      this.props.back();
    }
  }

  render() {
    let message =
    this.state.confirmReserve? this.props.name + '\n\n確定留位?':
    this.state.confirmCancelReserve? this.props.name + '\n\n確定取消留位?':
    this.props.registered? this.props.name + '\n\n' + this.props.profile.name + '你好，你已經報名！':
    this.props.reserved? this.props.name + '\n\n' + this.props.profile.name + '你好，你已經留位！':
    this.props.name + '\n\n' + this.props.profile.name + '你好，你並未留位！';

    let _btnProps = {
      img: require('../../Images/btn2.png'),
      style: StyleSheet.create({
        btnText: {
          fontSize: width * 0.06,
          textAlign: 'center',
          color: '#EEBF57',
          position:'absolute'
        },
        btnArea: {
          width: width * 0.35,
          height: height * 0.3,
          alignItems:'center',
          justifyContent: 'center',
        },
        btnImg: {
          width: width * 0.3,
          height: height * 0.3,
          resizeMode: 'contain'
        }
      })
    }

    let _btnProps2 = {
      img: require('../../Images/btn.png'),
      style: StyleSheet.create({
        btnText: {
          fontSize: width * 0.06,
          textAlign: 'center',
          color: 'white',
          position:'absolute'
        },
        btnArea: {
          width: width * 0.35,
          height: height * 0.3,
          alignItems:'center',
          justifyContent: 'center',
        },
        btnImg: {
          width: width * 0.3,
          height: height * 0.3,
          resizeMode: 'contain'
        }
      })
    }

    return (
      <View style={[viewStyles.container, {backgroundColor:'transparent'}]}>
          <Image source={require('../../Images/popup_whitebg.png')} style={viewStyles.area}/>
          <Text style={textStyles.standard}> {message} </Text>
          <View style={viewStyles.buttonRow}>
            {!this.props.registered && <Button buttonPressed={this.reserveCancelButtonPressed.bind(this)} btnProps={_btnProps} text={(this.state.confirmReserve || this.state.confirmCancelReserve)? '確定': !this.props.reserved? '留位':'取消留位'}/>}
            <Button buttonPressed={this.backButtonPressed.bind(this)} btnProps={_btnProps2} text={(this.state.confirmReserve || this.state.confirmCancelReserve)? '取消':'返回'}/>
          </View>
      </View>
    );
  }

}
