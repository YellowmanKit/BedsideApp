import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ToastAndroid
} from 'react-native';
import TitleBar from './TitleBar';
import HomeContent from '../HomeContent/HomeContent';
import NFC, {NfcDataType, NdefRecordType} from "react-native-nfc";
import ContentYoutube from '../Content/ContentYoutube';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'white',
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  TitleBar: {
    flex: 0.25,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 0.75,
  },
});

export default class Home extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      pressedCell:{
        home: true
      },
      trace:[],

      tagId: '',
      youtubeMode: false,
      youtubeUrl: '',

      profile:{

      },
      nfcListening: true,

      pressinTime: Number.MAX_VALUE
    };
  }

  setYoutubeUrl(url){
    this.setState({
      youtubeUrl: url
    })
  }

  componentDidMount(){
    //console.log("NFC addListener");
    NFC.addListener(this.nfcListener);
  }

  nfcListener = (payload) => {
    NFC.addListener((payload)=>{
      if(this.state.nfcListening){
        this.setState({
          nfcListening: false
        });
        //ToastAndroid.show('NFCID: '+ payload.data.id,ToastAndroid.SHORT);
        this.getProfile(payload.data.id);
        //console.log(payload.data.id);
      }
    })
  }
  //test user 李宏毅 nfc id:53a4c9ef000680
  getProfile(id){
    let toFetch = 'http://10.0.48.22/EHMS/api/getResBedPrfl/' + id;
    //console.log(toFetch);
    fetch(toFetch)
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.ResBedPrfl;
    }).then(ResBedPrfl =>{
        var length = ResBedPrfl.length;
        //for (var i = length - 1; i >= 0;i--) {
          //if(ResBedPrfl.NFCID === id || i===0){
            if(length === 1){
              let _profile = {
                name: ResBedPrfl[0].ElderName.replace('*','').trim(),
                MemID: ResBedPrfl[0].MemID,
                NFCID: ResBedPrfl[0].NFCID,
                CtrID: ResBedPrfl[0].CtrID,
                FoodAllergy: ResBedPrfl[0].FoodAllergy,
                BedNo: ResBedPrfl[0].BedNo,
                RmNo: ResBedPrfl[0].RmNo,
                CltPro: ResBedPrfl[0].CltPro,
              }
              this.setState({
                profile: _profile,
                tagId: id
              })

          }else{
            //console.log('此標籤並未登記!');
            ToastAndroid.show('此標籤並未登記!',ToastAndroid.SHORT);
          }
            //console.log(_profile);
            //break;
          //}
        //}
      }
    ).then(()=>{
      this.setState({
        nfcListening: true
      })
    }).catch(err=>{
      ToastAndroid.show('讀取錯誤!',ToastAndroid.SHORT);
      this.setState({
        nfcListening: true
      })
    });
  }

  backToHome(){
    this.setState({
      pressedCell:{
        home: true
      },
      trace:[]
    })
  }

  _onPressOut = () => {
    let pressoutTime = new Date().getTime() / 1000;
    //console.log(pressoutTime + " " + this.state.pressinTime);
    if(pressoutTime - this.state.pressinTime > 3){
      BackHandler.exitApp();
    }
    this.setState({
      pressinTime: Number.MAX_VALUE
    });
  }
  _onPressIn = () => {
    this.backToPreviousPage();
    this.setState({
      tagId: '',
      profile:{},
      pressinTime: new Date().getTime() / 1000,
      nfcListening:true
    });
  }

  backToPreviousPage(){
    this.state.trace.splice(0,1);
    if(this.state.trace.length == 0){
      this.setState({
        pressedCell: {
          home: true
        }
      });
    } else {
      this.setState({
        pressedCell: this.state.trace[0]
      });
    }
  }

  onCellPressed(cellProps){
    this.setState({
      pressedCell: cellProps
    })
    this.state.trace.splice(0,0,cellProps);
  }

  toggleYoutubePlayerMode(){
    this.setState({
      youtubeMode: !this.state.youtubeMode
    })
  }

  render() {
    if(this.state.youtubeMode){
      return (
        <View style={viewStyles.mainContainer}>
          <ContentYoutube link={this.state.pressedCell.link} toggleYoutubePlayerMode={this.toggleYoutubePlayerMode.bind(this)}/>
        </View>
      );
    }

    return (
      <View style={viewStyles.mainContainer}>
        <Image source={require('../Images/bedside_bg_new.png')} style={viewStyles.background}/>
        <TouchableOpacity style={viewStyles.TitleBar} onPressOut={this._onPressOut.bind(this)} onPressIn={this._onPressIn.bind(this)}>
          <TitleBar pressedCell={this.state.pressedCell} toggleYoutubePlayerMode={this.toggleYoutubePlayerMode.bind(this)}/>
        </TouchableOpacity>
        <View style={viewStyles.content}>
          <HomeContent
          setYoutubeUrl={this.setYoutubeUrl.bind(this)}
          pressedCell={this.state.pressedCell}
          profile={this.state.profile}
          tagId={this.state.tagId}
          onCellPressed={this.onCellPressed.bind(this)}
          backToHome={this.backToHome.bind(this)}
          />
        </View>
      </View>
    );
  }

}
