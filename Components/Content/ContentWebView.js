import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    WebView,
    TouchableOpacity,
    Image,
    View,
    Dimensions
} from 'react-native';
import NfcHint from '../HomeContent/NfcHint';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const imgHome = require('../Images/home.png');
const viewStyles = StyleSheet.create({
  topBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height:  height * 0.15
  },
  homeButton: {
    width: width * 0.06,
    height: width * 0.06,
    marginTop: width * 0.015,
    marginLeft: width * 0.015
  },
  button: {
    width: width * 0.06,
    height: width * 0.06
  }
});
const textStyles = StyleSheet.create({
  message: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.02,
    width: width * 0.2,
    height: height * 0.05,
    position: 'absolute',
    left: width * 0.3,
    top: height * 0.5,
    color: 'black'
  }
});

export default class ContentWebView extends Component {

  constructor(props) {
      super(props)
      this.state = {
          message: '',
          isFinishLoad: false,
          isPressIn: false,
          isExitApp: false
      }
  }

  componentDidMount() {
      this._isMounted = true;
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  _setState = (newState) => {
      if(this._isMounted){
          this.setState(newState);
      }
  }

  _onError = async (error) => {
      await this._setState({ message: '載入失敗，請返回後再試一次！' + error, isFinishLoad: false });
      to = setTimeout(() => {
          Actions.pop();
      }, 10000);
  }

  _onLoadEnd = () => {
      this._setState({ message: '' });
      //setTimeout(() => {
      //    this._setState({ isFinishLoad: true });
      //}, 3000);
  }

  _onLoadStart = () => {
      this._setState({ message: '載入中，請稍等.....', isFinishLoad: false });
      this.props.setYoutubeUrl(this.props.link);
  }

  onNavigationStateChange(webViewState){
    //console.log(webViewState.url);
    this.props.setYoutubeUrl(webViewState.url);
  }

  render() {
    if(this.props.link == 'nfcTest'){

      if(this.props.tagId == ''){
        return (
          <NfcHint nfcTest={true}/>
        );
      }else{

        let html = `
        <form id='myForm' style="background-color:#E6E6FA";>
          <center>
            NFC Tag:<br>
            <input id='myTag' type="text" name="firstname"  size="50"><br>
          </center>
        </form>
        `;

        let jsCode = `document.getElementById('myTag').value="`+this.props.tagId+`"`;

        return (
            <View style={{flex: 1 , padding: Dimensions.get('window').width * 0.01}}>
              <WebView
                ref={component => {
                  this.webViewRef = component;
                }}
                //source={{ uri: this.props.link }}
                source={{ html: html }}
                style={{ flex: 1 }}
                onError={(error) => this._onError(error)}
                onLoadEnd={this._onLoadEnd}
                onLoadStart={this._onLoadStart}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}

              />
              {!this.state.isFinishLoad && <Text style={textStyles.message}>{this.state.message}</Text>}
            </View>
        );
      }

    }

    return (
        <View style={{flex: 1 , padding: Dimensions.get('window').width * 0.01}}>
          <WebView
            source={{ uri: this.props.link }}
            //source={{ html: html }}
            style={{ flex: 1 }}
            onError={(error) => this._onError(error)}
            onLoadEnd={this._onLoadEnd}
            onLoadStart={this._onLoadStart}
            javaScriptEnabledAndroid={true}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
          {!this.state.isFinishLoad && <Text style={textStyles.message}>{this.state.message}</Text>}
        </View>
    );
  }

}
