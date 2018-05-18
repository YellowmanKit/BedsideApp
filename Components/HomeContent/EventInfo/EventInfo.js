import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import NfcHint from '../NfcHint';
import Button from '../Button';
import ConfirmPage from './ConfirmPage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.1
  },
  info: {
      width: width * 1,
      height: height * 1,
      resizeMode: 'contain',
      position: 'absolute',
      top: height * 0.03
  },
  detail: {
      flexDirection: 'column',
      backgroundColor: 'transparent',
      width: width * 0.5,
      height: height * 0.5,
      position: 'absolute',
      top: height * 0.245,
      left: width * 0.225
  },
  button: {
    position: 'absolute',
    top: height * 0.7,
  }
});
const textStyles = StyleSheet.create({
  eventName: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.0375,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    position: 'absolute',
    top: height * 0.0725,
  },
  eventDetail: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.0295,
    textAlign: 'left',
    color:'black',
    lineHeight: height * 0.0675
  },
  eventFee:{
    fontFamily: 'adobestdb',
    fontSize: width * 0.025,
    textAlign: 'left',
    color:'black',
    lineHeight: height * 0.0625
  }
});

function getPeriodString(periodStart,periodEnd){
  let startYear = periodStart.getFullYear();
  let startMonth = periodStart.getMonth() + 1;
  let startDay = periodStart.getDate();

  let endYear = periodEnd.getFullYear();
  let endMonth = periodEnd.getMonth() + 1;
  let endDay = periodEnd.getDate();

  let dateStr = startYear + '年' + startMonth + '月' + startDay + '日至';
  if(startYear != endYear){
    dateStr += endYear + '年';
  }
  dateStr += endMonth + '月' + endDay + '日';
  return dateStr;
}

function getDateString(date){
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateStr = year + '年' + month + '月' + day + '日';
  return dateStr;
}

export default class EventInfo extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      showNfcReserveStatus: false,
      showConfimCancelPage: false,
      userNfcTagId:'',
      reserved: false,
      registered: false
    }
  }

  checkReserve(){
    this.setState({
      showNfcReserveStatus: true
    });
  }

  componentWillReceiveProps(nextProps) {
    //console.log('tag detected');
    if(this.state.showNfcReserveStatus && nextProps.tagId !=''){
      //console.log(this.props.eventCell.reserved);
      this.setState({
        userNfcTagId: nextProps.tagId,
        reserved: this.props.eventCell.reserved.includes(this.props.profile.NFCID),
        registered: this.props.eventCell.registered.includes(this.props.profile.NFCID)  ? true:false ,
        showConfimCancelPage: true
      });
    }
  }

  getPeriodString(){
    let startYear = this.props.eventCell.periodStart.getFullYear();
    let startMonth = this.props.eventCell.periodStart.getMonth() + 1;
    let startDay = this.props.eventCell.periodStart.getDate();

    let endYear = this.props.eventCell.periodEnd.getFullYear();
    let endMonth = this.props.eventCell.periodEnd.getMonth() + 1;
    let endDay = this.props.eventCell.periodEnd.getDate();

    let dateStr = startYear + '年' + startMonth + '月' + startDay + '日至';
    if(startYear != endYear){
      dateStr += endYear + '年';
    }
    dateStr += endMonth + '月' + endDay + '日';
    return dateStr;
  }

  GetWeekDayString(weekDay){
    //console.log(weekDay);
    let toReturn = '';
    for (var i = 0;i < 7; i++) {
      if(weekDay.charAt(i) == '1'){
        toReturn += this.GetWeekDay(i) + '、';
      }
    }
    return(toReturn.substring(0,toReturn.length - 1));
  }

  GetWeekDay(index){
    let toReturn =
      index == '0'? '日':
      index == '1'? '一':
      index == '2'? '二':
      index == '3'? '三':
      index == '4'? '四':
      index == '5'? '五':
      index == '6'? '六':
      '日';
    return(toReturn);
  }

  Back(){
    this.props.backToHome();
    this.setState({
      showConfimCancelPage: false,
      showNfcReserveStatus: false
    });
  }

  confirmedReserve(reserve){
    if(reserve){
      this.reserveEvent(true);
    }else{
      this.reserveEvent(false);
    }
  }

  reserveEvent(reserve){

    fetch('http://10.0.48.22/EHMS/api/updEvtErl/', {
      method: 'POST',
      headers: {
        Accept: 'application/x-www-form-json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        'MEMID': this.props.profile.MemID,
        'CTRID': this.props.profile.CtrID,
        'EvtCod': this.props.eventCell.EvtCod,
        'ErlName': this.props.profile.name,
        'ErlDat': this.getDateString(),
        'IsMbr': '1',
        'ErlPhone': '12345678',
        'EvtCosID': '1',
        'EvtAct': reserve?'RSVD':'CANN'
      }),
    }).then(res =>{
      console.log(res);
      var json = JSON.parse(res._bodyText);
      //console.log(json);
      if(json.rtn === "0"){
        if(reserve){
          //ToastAndroid.show('已成功留位!',ToastAndroid.SHORT);
          this.setState({
            reserved: true,
            localReserved: this.props.profile.NFCID
          })
        }else{
          //ToastAndroid.show('已取消留位!',ToastAndroid.SHORT);

          this.setState({
            reserved: false,
            localReserved: ''
          })
        }
      }else{
        ToastAndroid.show('程序失敗，請再試一次! ' + json.msg,ToastAndroid.SHORT);
      }

    }).catch(err=>{
      console.log(err);
      //ToastAndroid.show('錯誤!',ToastAndroid.SHORT);
    });
  }

  getDateString() {
    let date = new Date();
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + monthIndex + '-' + day;
    return dateStr;
  }

  getCurrentDateString() {
    let date = new Date();
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '年' + monthIndex + '月' + day + '日\n';
    return dateStr;
  }

  render() {

    if(this.state.showConfimCancelPage){
      return (
        <ConfirmPage
        name={this.props.eventCell.name}
        profile={this.props.profile}
        reserved={!this.state.registered && this.state.reserved}
        registered={this.state.registered}
        confirmedReserve={this.confirmedReserve.bind(this)}
        back={this.Back.bind(this)}/>
      );
    }

    if(this.state.showNfcReserveStatus){
      return (
        <NfcHint eventReserveStatus={true}/>
      );
    }

    let _btnProps = {
      img: require('../../Images/btn.png'),
      style: StyleSheet.create({
        btnText: {
          fontSize: width * 0.06,
          textAlign: 'center',
          color:'white',
          position:'absolute'
        },
        btnArea: {
          width: width * 0.3,
          height: height * 0.3,
          alignItems:'center',
          justifyContent: 'center'
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
          <Image source={require('../../Images/activitynotice_info.png')} style={viewStyles.info}/>
          <Text style={textStyles.eventName}>{this.props.eventCell.name}</Text>
          <View style={viewStyles.detail}>
            <Text style={textStyles.eventDetail}> {this.props.eventCell.periodStart + ' ~ ' + this.props.eventCell.periodEnd} </Text>
            <Text style={textStyles.eventDetail}> {this.props.eventCell.time} </Text>
            <Text style={textStyles.eventDetail}> {this.GetWeekDayString(this.props.eventCell.weekDay)} </Text>
            <Text style={textStyles.eventDetail}> {this.props.eventCell.venue} </Text>
            <Text style={textStyles.eventFee}> {this.props.eventCell.fee} </Text>
            <Text style={textStyles.eventDetail}> {this.props.eventCell.deadLine} </Text>
          </View>
          <View style={viewStyles.button}>
            <Button buttonPressed={this.checkReserve.bind(this)} text='留位狀況' btnProps={_btnProps}/>
          </View>
      </View>
    );
  }

}
