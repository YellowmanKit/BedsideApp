import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Clock from './Clock';
import Button from '../HomeContent/Button';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  content:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingBottom: height * 0.05,
    paddingRight: width * 0.015
  },
  barImg: {
      width: width * 0.25,
      height: height * 1.09,
      resizeMode: 'stretch',
      position: 'absolute',
      top: -1

  },
  backBtn:{
    width: width * 0.15,
    height: height * 0.15,
    resizeMode: 'contain',
    position: 'absolute',
    top: height * -0.015,
    left: width * 0.0375
  }
});
const textStyles = StyleSheet.create({
  title: {
    fontSize: width * 0.05,
    textAlign: 'center',
    margin: width * 0.05,
    color:'black',
  }
});

export default class TitleBar extends Component<{}> {

  render() {
    let img =
      this.props.pressedCell.userProfile? require('../Images/titleBar_userprofile.png'):
      this.props.pressedCell.residentInfo? require('../Images/titleBar_centreinfo.png'):
      (this.props.pressedCell.eventsInfo || this.props.pressedCell.activityNotice)? require('../Images/titleBar_activitynotice.png'):
      this.props.pressedCell.entertainmentChannel? require('../Images/titleBar_entertainment.png'):

      this.props.pressedCell.dailyMeal? require('../Images/titleBar_dailymeal.png'):
      this.props.pressedCell.healthInfo? require('../Images/titleBar_healthinfo.png'):
      this.props.pressedCell.dailyNotice? require('../Images/titleBar_dailynotice.png'):
      this.props.pressedCell.centreNotice? require('../Images/titleBar_centrenotice.png'):

      this.props.pressedCell.newsChannel? require('../Images/titleBar_Entertain_newschannel.png'):
      this.props.pressedCell.lifeCulture? require('../Images/titleBar_Entertain_lifeculture.png'):
      this.props.pressedCell.musicChannel? require('../Images/titleBar_Entertain_musicchannel.png'):
      this.props.pressedCell.healthChannel? require('../Images/titleBar_Entertain_healthchannel.png'):

      this.props.pressedCell.name == '新聞直播'? require('../Images/titleBar_livenews.png'):
      this.props.pressedCell.name == '天氣'? require('../Images/titleBar_weather.png'):
      this.props.pressedCell.name == '文化電台'? require('../Images/titleBar_cultureradio.png'):
      this.props.pressedCell.name == '新聞電台'? require('../Images/titlebar_newsradio.png'):
      this.props.pressedCell.name == '小人物大故事'? require('../Images/tilteBar_story.png'):
      this.props.pressedCell.name == '告別老香港'? require('../Images/tilteBar_hongkong.png'):
      this.props.pressedCell.name == '香港有心人'? require('../Images/tilteBar_goodpeople.png'):
      this.props.pressedCell.name == '鏗鏘集'? require('../Images/tilteBar_hkconnection.png'):
      this.props.pressedCell.name == '警訊'? require('../Images/tilteBar_police.png'):
      this.props.pressedCell.name == '議事論事'? require('../Images/tilteBar_policy.png'):
      this.props.pressedCell.name == '生肖運程'? require('../Images/tilteBar_fortune2018.png'):
      this.props.pressedCell.name == '粵劇經曲'? require('../Images/titleBar_opera.png'):
      this.props.pressedCell.name == '流行金曲'? require('../Images/titleBar_popsongs.png'):
      this.props.pressedCell.name == '電視劇名曲'? require('../Images/titleBar_tvsong.png'):
      this.props.pressedCell.name == '金曲串燒'? require('../Images/titleBar_songlist.png'):
      this.props.pressedCell.name == '仁濟座式太極(一)'? require('../Images/tilteBar_taichi01.png'):
      this.props.pressedCell.name == '仁濟座式太極(二)'? require('../Images/tilteBar_taichi02.png'):
      this.props.pressedCell.name == '怡老按摩'? require('../Images/tilteBar_massge.png'):
      this.props.pressedCell.name == '仁濟易筋十段錦'? require('../Images/tilteBar_tenkam.png'):

      this.props.pressedCell.name == '長者健體運動'? require('../Images/NEW_tilteBar_elderlyexercise.png'):
      this.props.pressedCell.name == '太極防跌八式'? require('../Images/NEW_tilteBar_taichi.png'):
      this.props.pressedCell.name == '健康操-國語'? require('../Images/NEW_tilteBar_healthyexercise.png'):
      this.props.pressedCell.name == '椅子運動-國語'? require('../Images/NEW_tilteBar_chairexercise.png'):
      //require('../Images/titleBar_mainmenu_empty.png');
      require('../Images/titleBar_mainmenu.png');

    let _btnProps = {
      img: require('../Images/Fullscreen_btn.png'),
      style: StyleSheet.create({
        btnText: {
          fontSize: Dimensions.get('window').width * 0.06,
          textAlign: 'center',
          color:'white',
          position:'absolute'
        },
        btnArea: {
          width: Dimensions.get('window').width * 0.2,
          height: Dimensions.get('window').height * 0.225,
          alignItems:'center',
          justifyContent: 'center',
        },
        btnImg:{
          width: Dimensions.get('window').width * 0.2,
          height: Dimensions.get('window').height * 0.165,
          resizeMode: 'stretch'
        }
      })
    }

    /*if(this.props.pressedCell.link != null && (this.props.pressedCell.link.includes('youtube'))){
      return(
        <View style={viewStyles.content}>
          <Image source={img}
            style={viewStyles.barImg}/>
          <Image source={this.props.pressedCell.home? require('../Images/empty.png'):
            require('../Images/previous_page_btn.png')}
            style={viewStyles.backBtn}/>
          <Button buttonPressed={this.props.toggleYoutubePlayerMode} text='' btnProps={_btnProps} />
        </View>
      );
    }*/

    return (
      <View style={viewStyles.content}>
        <Image source={img}
          style={viewStyles.barImg}/>
        <Image source={this.props.pressedCell.home? require('../Images/empty.png'):
          require('../Images/previous_page_btn.png')}
          style={viewStyles.backBtn}/>
        <Clock atHome={this.props.pressedCell.home}/>
      </View>
    );
  }

}
