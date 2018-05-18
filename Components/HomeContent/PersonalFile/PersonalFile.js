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

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.1
  },
  userInfo: {
    width: width * 0.5,
    height: height * 0.5,
    resizeMode: 'contain',
    position: 'absolute',
    top: height * -0.03
  },
  healthInfo: {
    width: width * 0.75,
    height: height * 0.75,
    resizeMode: 'contain',
    position: 'absolute',
    top: height * 0.35
  },
  photo: {
    width: width * 0.2,
    height: height * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    top: height * 0.125,
    left: height * 0.225,
  },
  bloodPressureContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    width: width * 0.67,
    height: height * 0.25,
    position: 'absolute',
    top: height * 0.52,
    left: height * 0.0695,
    backgroundColor: 'transparent'
  },
  bloodSugarContainer: {
    flexDirection:'row',
    flexWrap: 'nowrap',
    width: width * 0.67,
    height: height * 0.12,
    position: 'absolute',
    top: height * 0.88,
    left: height * 0.0695,
  },

});
const textStyles = StyleSheet.create({
  standard: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.04,
    textAlign: 'center',
    margin: width * 0.01,
    color:'black',
  },
  topInfo: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.026,
    lineHeight: height * 0.0615,
    textAlign: 'left',
    color:'black',
    position: 'absolute',
    top: height * 0.115,
    left: width * 0.45,

  },
  bloodPressure: {
    fontFamily: 'adobestdb',
    width: width * 0.167,
    height: height * 0.125,

    fontSize: width * 0.03,
    textAlign: 'center',
    color:'black',
    backgroundColor: 'transparent'
  },
  bloodSugar: {
    fontFamily: 'adobestdb',
    width: width * 0.0835,
    height: height * 0.125,

    fontSize: width * 0.03,

    textAlign: 'center',
    color:'black',
    backgroundColor: 'transparent'
  },
});

export default class PersonalFile extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      infoFetched: false,
      clientInfo: {
      },
      bloodPressureRecord: {
      },
      bloodSugarRecord: {
      }
    }
  }

  /*getClientInfo(){
    fetch('http://203.80.94.163:9000/IESS_DEV/Api/getClientInfo/RM201')
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.RoomInfo;
    }).then(RoomInfo =>{
        var length = RoomInfo.length;
        for (var i = 0; i < length;i++) {
          if(RoomInfo[i].NFCID.trim() === this.props.profile.NFCID){
            let _clientInfo = {
              CltPro: RoomInfo[i].CltPro,
              LeaveStatus: RoomInfo[i].LeaveStatus,
              RmNo: RoomInfo[i].RmNo,
              BedNo: RoomInfo[i].BedNo,
              Gender: RoomInfo[i].Gender,
              Nurse: RoomInfo[i].Nurse,
              Pcw: RoomInfo[i].Pcw,
              NFCID: RoomInfo[i].NFCID
            }
            this.setState({
              clientInfo: _clientInfo,
            })
            //console.log(_clientInfo);
            break;
          }
        }
      }
    )
  }*/

  getBloodPressureInfo(){
    fetch('http://10.0.48.22/EHMS/API/getBldRcd/' + this.getCurrentDateString())
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.BldRcd;
    }).then(BldRcd =>{
      //console.log(BldRcd);
      var length = BldRcd.length;
      for(var i = 0; i < length;i++){
        //console.log(BldRcd[i].NFCID + '  ' + this.props.profile.NFCID);

        if(BldRcd[i].NFCID === this.props.profile.NFCID){
          let _bloodPressureRecord = {
            RcdDat: BldRcd[i].RcdDat,
            RcdTim: BldRcd[i].RcdTim,
            UpdPrs: BldRcd[i].UpdPrs,
            LowPrs: BldRcd[i].LowPrs,
            Pul: BldRcd[i].Pul,
            Oxy: BldRcd[i].Oxy,
            RpsRat: BldRcd[i].RpsRat,
            Tmt: BldRcd[i].Tmt,
            Rmk: BldRcd[i].Rmk,
            NFCID: BldRcd[i].NFCID
          }
          this.setState({
            bloodPressureRecord: _bloodPressureRecord
          })
          //console.log(_bloodPressureRecord);
          break;
        }
      }
    }).catch(err=>{
      ToastAndroid.show('沒有血壓記錄!',ToastAndroid.SHORT);
    });
  }

  getBloodSugarInfo(){
    fetch('http://10.0.48.22/EHMS/API/getBldSugRcd/' + this.getCurrentDateString())
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.BldSugRcd;
    }).then(BldSugRcd =>{
        var length = BldSugRcd.length;
        for(var i = 0; i < length;i++){
          if(BldSugRcd[i].NFCID.trim() === this.props.profile.NFCID){
            let _bloodSugarRecord = {
              RcdDat: BldSugRcd[i].RcdDat.substring(5,BldSugRcd[i].RcdDat.length),
              BldSugBfBK: BldSugRcd[i].BldSugBfBK,
              BldSugAfBK: BldSugRcd[i].BldSugAfBK,
              BldSugBfLN: BldSugRcd[i].BldSugBfLN,
              BldSugAfLN: BldSugRcd[i].BldSugAfLN,
              BldSugBfDN: BldSugRcd[i].BldSugBfDN,
              BldSugAfDN: BldSugRcd[i].BldSugAfDN,
              BldSugBfSL: BldSugRcd[i].BldSugBfSL,
              Rmk: BldSugRcd[i].Rmk
            }
            this.setState({
              bloodSugarRecord: _bloodSugarRecord
            })
            //console.log(_bloodSugarRecord);
            break;
          }
        }
      }
    ).catch(err=>{
      ToastAndroid.show('沒有血糖記錄!',ToastAndroid.SHORT);
    })
  }

  getCurrentDateString() {
    let date = new Date();
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //console.log(dateStr);
    ToastAndroid.show(dateStr,ToastAndroid.SHORT);
    //return '2018-02-08';
    return dateStr;
  }

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  componentWillReceiveProps(newProps){
    if(!this.state.infoFetched && this.props.tagId != '' && this.props.profile.MemID != null){
      //console.log("componentWillReceiveProps:");
      //this.getClientInfo();
      this.getBloodPressureInfo();
      this.getBloodSugarInfo();
    }
  }

  render() {
    if(this.props.tagId != ''){
      let brecord = this.state.bloodPressureRecord;
      let bloodPressureData = [brecord.RcdDat,brecord.RcdTim,brecord.UpdPrs,brecord.LowPrs,brecord.Pul,brecord.Oxy,brecord.RpsRat,brecord.Tmt];
      let _key = 0;
      let bloodPressureCell = bloodPressureData.map(data=>{
        _key++;
        return data !== undefined? <Text key={_key} style={textStyles.bloodPressure}> {'\n' + data} </Text>:
        <Text key={_key} style={textStyles.bloodPressure}> {'\nn/a'} </Text>
      });

      let _key2 = 0;
      let bsrecord = this.state.bloodSugarRecord;
      let bloodSugarData = [bsrecord.RcdDat,bsrecord.BldSugBfBK,bsrecord.BldSugAfBK,bsrecord.BldSugBfLN,bsrecord.BldSugAfLN,bsrecord.BldSugBfDN,bsrecord.BldSugAfDN,bsrecord.BldSugBfSL];
      let bloodSugarCell = bloodSugarData.map(data=>{
        _key2++;
        return data !== undefined? <Text key={_key2} style={textStyles.bloodSugar}> {'\n' + data} </Text>:
        <Text key={_key2} style={textStyles.bloodSugar}> {'\nn/a'} </Text>
      });

      return (
        <View style={[viewStyles.container, {backgroundColor:'transparent'}]}>
            <Image source={require('../../Images/userprofile_userinfo.png')} style={viewStyles.userInfo}/>
            <Image source={require('../../Images/userprofile_userhealthinfo_new.png')} style={viewStyles.healthInfo}/>
            <Image source={{uri:this.props.profile.CltPro}} style={viewStyles.photo} />
            <Text style={textStyles.topInfo}>
              {this.props.profile.name + '\n' +  this.props.profile.MemID + '\n' + this.props.profile.RmNo + '\n' + this.props.profile.BedNo}
            </Text>

            <View style={viewStyles.bloodPressureContainer}>
              {bloodPressureCell}
            </View>

            <View style={viewStyles.bloodSugarContainer}>
              {bloodSugarCell}
            </View>

        </View>
      )
    };
    return (
      <NfcHint personalInfo={true}/>
    );
  }

}
