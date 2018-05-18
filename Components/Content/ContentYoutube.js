import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import YouTube from 'react-native-youtube'
import Button from '../HomeContent/Button'

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtube: {
    flex: 0.9,
    paddingLeft: 50
  },
  controlPanel: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  panelBackground:{
    flex: 1,
    position: 'absolute',
    resizeMode: 'contain'
  }
});
const textStyles = StyleSheet.create({
  message: {
    fontSize: Dimensions.get('window').width * 0.02,
    padding: Dimensions.get('window').width * 0.3,
    textAlign:'center',
    position: 'absolute',
    color: 'white'
  }
});

export default class ContentYoutube extends Component {

  getYoutubeVideoId(){
    let linkStr = this.props.link;
    let startIndex = linkStr.indexOf('v=') + 2;
    let substring = linkStr.substring(startIndex,linkStr.length);
    let endIndex = substring.indexOf('&') != -1? substring.indexOf('&') : substring.length;
    let id = substring.slice(0,endIndex);
    //console.log('video id:' + id);
    return(id);
  }

  getYoutubePlayListId(){
    let linkStr = this.props.link;
    //console.log(linkStr);

    if(!linkStr.includes('list=')){
      return('noListId');
    }

    let startIndex = linkStr.indexOf('list=') + 5;
    let substring = linkStr.substring(startIndex,linkStr.length);
    let endIndex = substring.indexOf('&') != -1? substring.indexOf('&'):substring.length;

    let id = substring.slice(0,endIndex);
    //console.log('list id:' + id);
    return(id);
  }

  componentWillMount(){
    this.setState({
      playBtnText: '暫停',
      playing: true
    });
  }

  render(){

    let _btnProps = {
      img: require('../Images/popup_whitebg.png'),
      style: StyleSheet.create({
        btnText: {
          fontSize: Dimensions.get('window').width * 0.03,
          textAlign: 'center',
          color:'black',
          position:'absolute'
        },
        btnArea: {
          width: Dimensions.get('window').width * 0.1425,
          height: Dimensions.get('window').height * 0.1,
          alignItems:'center',
          justifyContent: 'center'
        },
        btnImg:{
          width: Dimensions.get('window').width * 0.125,
          height: Dimensions.get('window').height * 0.09,
          resizeMode: 'stretch'
        }
      })
    }

    let listId  = this.getYoutubePlayListId();
    if(listId === 'noListId'){

      return (
        <View style={viewStyles.container}>
          <YouTube
            ref={component => {
              this.youTubeRef = component;
            }}
            apiKey='AIzaSyBfnXmCBOnkTGDixHdRdB9pI97PGRsqgak'
            videoId={this.getYoutubeVideoId()}
            //playlistId={this.getYoutubePlayListId()}
            play={this.state.playing}
            fullscreen={false}
            loop={false}
            controls={0}

            onReady={e => this.setState({ isReady: true })}

            style={viewStyles.youtube}
            />
            <View style={viewStyles.controlPanel}>
              <Image source={require('../Images/bedside_bg.jpg')} style={viewStyles.panelBackground}/>
              <Button buttonPressed={this.togglePlayPause.bind(this)} text={this.state.playBtnText} btnProps={_btnProps}/>
              <Button buttonPressed={this.replay.bind(this)} text={'重播'} btnProps={_btnProps}/>
              <Button buttonPressed={this.previousVideo.bind(this)} text={'上一段'} btnProps={_btnProps}/>
              <Button buttonPressed={this.nextVideo.bind(this)} text={'下一段'} btnProps={_btnProps}/>
              <Button buttonPressed={this.backwardThirty.bind(this)} text={'<<30秒'} btnProps={_btnProps}/>
              <Button buttonPressed={this.forwardThirty.bind(this)} text={'>>30秒'} btnProps={_btnProps}/>
              <Button buttonPressed={this.props.toggleYoutubePlayerMode} text={'返回'} btnProps={_btnProps}/>
            </View>
        </View>
      );

    }else{

      return (
        <View style={viewStyles.container}>
          <YouTube
            ref={component => {
              this.youTubeRef = component;
            }}
            apiKey='AIzaSyBfnXmCBOnkTGDixHdRdB9pI97PGRsqgak'
            //videoId={this.getYoutubeVideoId()}
            playlistId={this.getYoutubePlayListId()}
            play={this.state.playing}
            fullscreen={false}
            loop={false}
            controls={0}

            onReady={e => this.setState({ isReady: true })}

            style={viewStyles.youtube}
            />
            <View style={viewStyles.controlPanel}>
              <Image source={require('../Images/bedside_bg.jpg')} style={viewStyles.panelBackground}/>
              <Button buttonPressed={this.togglePlayPause.bind(this)} text={this.state.playBtnText} btnProps={_btnProps}/>
              <Button buttonPressed={this.replay.bind(this)} text={'重播'} btnProps={_btnProps}/>
              <Button buttonPressed={this.previousVideo.bind(this)} text={'上一段'} btnProps={_btnProps}/>
              <Button buttonPressed={this.nextVideo.bind(this)} text={'下一段'} btnProps={_btnProps}/>
              <Button buttonPressed={this.backwardThirty.bind(this)} text={'<<30秒'} btnProps={_btnProps}/>
              <Button buttonPressed={this.forwardThirty.bind(this)} text={'>>30秒'} btnProps={_btnProps}/>
              <Button buttonPressed={this.props.toggleYoutubePlayerMode} text={'返回'} btnProps={_btnProps}/>
            </View>
        </View>
      );
    }
  }

  togglePlayPause(){
    this.setState({
      playing: !this.state.playing,
      playBtnText: this.state.playing?'播放':'暫停'
    })
  }

  replay(){
    this.youTubeRef.seekTo(0);
  }

  backwardFive(){
    this.youTubeRef.currentTime().then(currentTime => this.youTubeRef.seekTo(currentTime - 5))
  }

  backwardThirty(){
    this.youTubeRef.currentTime().then(currentTime => this.youTubeRef.seekTo(currentTime - 30))
  }

  forwardFive(){
    this.youTubeRef.currentTime().then(currentTime => this.youTubeRef.seekTo(currentTime + 5))
  }

  forwardThirty(){
    this.youTubeRef.currentTime().then(currentTime => this.youTubeRef.seekTo(currentTime + 30))
  }

  previousVideo(){
    this.youTubeRef.previousVideo();
  }

  nextVideo(){
    this.youTubeRef.nextVideo();
  }








}
