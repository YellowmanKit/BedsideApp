import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import Cell from './Cell';
import ScrollBar from './ScrollBar';
import PersonalFile from './PersonalFile/PersonalFile';
import EventInfo from './EventInfo/EventInfo';
import ContentWebView from '../Content/ContentWebView';
import ContentYoutube from '../Content/ContentYoutube';
import CachedImage from './CachedImage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const apiServer = 'http://10.0.48.21:8004/api/';
//const apiServer = 'http://10.6.77.192:8004/api/';
const viewStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'transparent',
  },
  icon: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain'
  },
  noticeImg: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain'
  },
  bar: {
    position:'absolute',
    resizeMode:'stretch',
    right:2,
    width: width * 0.012
  }
});
const textStyles = StyleSheet.create({
  standard: {
    fontSize: width * 0.04,
    textAlign: 'center',
    margin: width * 0.025,
    color:'black',
  }
});

export default class HomeContent extends Component<{}> {

    roughSizeOfObjectByBytes( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
  }

  async asyncStore(key,value){
    //console.log('save value:' + value);
    //var size = this.roughSizeOfObjectByBytes(value)
    //console.log(size);
    //await AsyncStorage.setItem(key, value);
    //this.state.cacheData[key] = value;
  }

  async asyncFetch(key){
    return null;
    /*console.log('asyncFetch ' + key)
    //if(this.state.cacheData[key] !== undefined){
    //  console.log('use cache data');
      //var size = this.roughSizeOfObjectByBytes(this.state.cacheData[key])
      //console.log(size);
    //  return this.state.cacheData[key];
  //  }
    console.log('fetching file data');
    const value = await AsyncStorage.getItem(key);
    if(value !== null){
      console.log('use file data');
    }else{
      console.log('no loacl data');
    }
    //var size = this.roughSizeOfObjectByBytes(value)
    //console.log(size);
    //this.state.cacheData[key] = value;
    return value;*/
  }

  getBarImg(){
    return(
      this.props.pressedCell.eventsInfo? require('../Images/bar_yellow.png'):
      (this.props.pressedCell.healthInfo || this.props.pressedCell.dailyNotice || this.props.pressedCell.centreNotice)? require('../Images/bar_darkblue.png'):
      this.props.pressedCell.lifeCulture? require('../Images/bar_brown.png'):
      require('../Images/bar_yellow.png')
    );
  }

  handleScroll(event) {
    let yPosi = event.nativeEvent.contentOffset.y;
    let yMax = (event.nativeEvent.contentSize.height - Dimensions.get('window').height) * 0.85;
    this.setState({
      barPosi: yPosi / yMax
    })
  }

  componentWillReceiveProps(nextProps){
    /*if(this.props.pressedCell.activityNotice && nextProps.pressedCell.eventsInfo){
      this.props.backToHome();
    }else */if(this.props.pressedCell.home && nextProps.pressedCell.eventsInfo){
      this.GetAndCreateEventCells();
    }else if(this.props.pressedCell.residentInfo && nextProps.pressedCell.dailyMeal){
      this.GetAndCreateDailyMealCells();
    }else if(this.props.pressedCell.home && nextProps.pressedCell.residentInfo){
      this.GetAndCreateResidentInfoCells();
    }
  }

  render() {
    if(this.props.pressedCell.userProfile){
      return (
        <View style={viewStyles.mainContainer}>
          <PersonalFile tagId={this.props.tagId} profile={this.props.profile}/>
        </View>
      );
    }

    if(this.props.pressedCell.activityNotice){
      return(
        <View style={viewStyles.mainContainer}>
          <EventInfo eventCell={this.props.pressedCell} tagId={this.props.tagId} profile={this.props.profile} backToHome={this.props.backToHome}/>
        </View>
      )
    }

    if(this.props.pressedCell.link != null){
      return (
        <View style={viewStyles.mainContainer}>
          <ContentWebView setYoutubeUrl={this.props.setYoutubeUrl} link={this.props.pressedCell.link} tagId={this.props.tagId}/>
        </View>
      );
    }

    let cellsToUse =
    this.props.pressedCell.home ? this.state.homeCells:
    this.props.pressedCell.eventsInfo? this.state.eventCells:
    this.props.pressedCell.residentInfo? this.state.residentInfoCells:
    this.props.pressedCell.entertainmentChannel? this.state.entertainCells:

    this.props.pressedCell.dailyMeal? this.state.dailyMealCells:
    this.props.pressedCell.healthInfo? this.state.healthInfoCells:
    this.props.pressedCell.dailyNotice? this.state.dailyNoticeCells:
    this.props.pressedCell.centreNotice? this.state.centreNoticeCells:

    this.props.pressedCell.newsChannel? this.state.newsChannelCells:
    this.props.pressedCell.lifeCulture? this.state.lifeCultureCells:
    this.props.pressedCell.musicChannel? this.state.musicChannelCells:
    this.props.pressedCell.healthChannel? this.state.healthChannelCells:
    [];

    if(this.props.pressedCell.healthInfo || this.props.pressedCell.dailyNotice || this.props.pressedCell.centreNotice){
      if(cellsToUse.length > 0){
        return (
          <View style={viewStyles.mainContainer}>
            <FlatList
              style={{flex: 0.95}}
              data={cellsToUse}
              numColumns={1}
              renderItem={({item}) => (
                <CachedImage imgName={item.name} apiServer={apiServer} style={viewStyles.noticeImg} mainFunctions={this.state.mainFunctions} />
              )}
              key={'key'}
              keyExtractor={item => item.name}
              showsVerticalScrollIndicator={false}
              onScroll={this.handleScroll.bind(this)}
            />
            <ScrollBar barImg={this.getBarImg()} barHeight={Dimensions.get('window').height / cellsToUse.length} barPosi={this.state.barPosi} toRender = {true} />
          </View>
        );
      }else{
        return (
          <View>
          </View>
        );
      }
    }

    return (
      <View style={viewStyles.mainContainer}>
        <FlatList
          style={{flex: 0.95}}
          data={cellsToUse}
          numColumns={2}
          renderItem={({item}) => (
              <Cell property={item} onCellPressed={this.props.onCellPressed}/>
          )}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll.bind(this)}
        />
        <ScrollBar barImg={this.getBarImg()} barHeight={Dimensions.get('window').height * 4 / cellsToUse.length} barPosi={this.state.barPosi} toRender = {(cellsToUse.length > 4)} />
      </View>
    );
  }

  constructor(props){
    super(props);

    this.state = {

      cacheData:{

      },

      mainFunctions:{
        asyncStore: this.asyncStore.bind(this),
        asyncFetch: this.asyncFetch.bind(this)
      },

      barPosi: 0,

      homeCells:[

        {
          name: '院友檔案',
          icon: require('../Images/userProfile.png'),
          //home: true
          userProfile: true
        },

        {
          name: '院社資訊',
          icon: require('../Images/residentInfo.png'),
          //home: true
          residentInfo: true
        },

        {
          name: '活動消息',
          icon: require('../Images/eventsInfo.png'),
          //home: true
          eventsInfo: true
        },

        {
          name: '娛樂頻道',
          icon: require('../Images/entertainmentChannel.png'),
          entertainmentChannel: true
        }

      ],

      eventCells:[

        /*{
          name: '瑜珈入門班 第九期',
          icon: require('../Images/activitynotice_btn01.png'),
          activityNotice: true,
          periodStart: new Date(2016,1,18,0,0,0,0),
          periodEnd: new Date(2016,2,26,0,0,0,0),
          time: '20:30 - 22:00',
          deadLine: new Date(2016,1,17,0,0,0,0),
          weekDay: '一、三、五',
          venue:'大活動室C',
          fee: '$100(院友) $150(家屬)',
          reserved: false
        }*/

      ],

      residentInfoCells:[

          {
            name: '每日餐單',
            icon: require('../Images/centreinfo_dailymeal_btn.png'),
            dailyMeal: true
          },

          {
            name: '健康資訊',
            icon: require('../Images/centreinfo_healthinfo_btn.png'),
            healthInfo: true
          },

          {
            name: '生活小提示',
            icon: require('../Images/centreinfo_dailynotice_btn.png'),
            dailyNotice: true
          },

          {
            name: '中心通告',
            icon: require('../Images/centreinfo_centrenotice_btn.png'),
            centreNotice: true
          }

      ],

      dailyMealCells:[
        /*{
          name: '早餐',
          icon: require('../Images/dailymeal_breakfast.png'),
          dish: '杏仁粉煮麥皮、\n菠菜芝士',
          meal: true
        },

        {
          name: '午餐',
          icon: require('../Images/dailymeal_lunch.png'),
          dish: '蒜蓉翠玉瓜、\n蕃茄炒蛋',
          meal: true
        },

        {
          name: '下午茶',
          icon: require('../Images/dailymeal_tea.png'),
          dish: '小蛋糕、\n曲奇',
          meal: true
        },

        {
          name: '晚餐',
          icon: require('../Images/dailymeal_dinner2.png'),
          dish: '薑汁唐生菜、\n蜜汁豬頸肉',
          meal: true
        }*/
      ],

      healthInfoCells:[
        /*{
          name: '健康資訊一',
          img: require('../Images/health_info_01.png'),
        },

        {
          name: '健康資訊二',
          img: require('../Images/health_info_01.png'),
        },

        {
          name: '健康資訊三',
          img: require('../Images/health_info_01.png'),
        }*/

      ],

      dailyNoticeCells:[
        /*{
          name: '小提示一',
          img: require('../Images/dailyTips.png'),
        },

        {
          name: '小提示二',
          img: require('../Images/dailyTips.png'),
        },

        {
          name: '小提示三',
          img: require('../Images/dailyTips.png'),
        }*/

      ],

      centreNoticeCells:[
        /*{
          name: '中心資訊一',
          img: require('../Images/centreInfo.png'),
        },

        {
          name: '中心資訊二',
          img: require('../Images/centreInfo.png'),
        },

        {
          name: '中心資訊三',
          img: require('../Images/centreInfo.png'),
        }*/

      ],

      entertainCells:[

        {
          name: '每日消息',
          icon: require('../Images/Entertain_newschannel_btn.png'),
          newsChannel: true
        },

        {
          name: '生活文化',
          icon: require('../Images/Entertain_lifeculture_btn.png'),
          lifeCulture: true
        },

        {
          name: '音樂頻道',
          icon: require('../Images/Entertain_musicchannel_btn.png'),
          musicChannel: true
        },

        {
          name: '健康頻道',
          icon: require('../Images/Entertain_healthchannel_btn.png'),
          healthChannel: true
        }

      ],

      newsChannelCells:[

        {
          name: '新聞直播',
          icon: require('../Images/newschannel_livenews_btn.png'),
          link: 'http://news.now.com/home/live'
        },

        {
          name: '天氣',
          icon: require('../Images/newschannel_weather_btn.png'),
          link: 'http://rthk9.rthk.hk/weather/index.htm'
        },

        {
          name: '文化電台',
          icon: require('../Images/newschannel_cultureradio_btn.png'),
          link:'http://www.rthk.hk/radio/radio5'
        },

        {
          name: '新聞電台',
          icon: require('../Images/newschannel_newsradio_btn.png'),
          link:'http://www.rthk.hk/radio/radio1'
        },

      ],

      lifeCultureCells:[

        {
          name: '小人物大故事',
          icon: require('../Images/lifeculture_storys_btn.png'),
          link:'https://www.youtube.com/watch?v=XNwWtFAiLw0&list=PLKF-pTEnmquzh8JQJoAeu-LlsfBU7Lyk8'
        },

        {
          name: '告別老香港',
          icon: require('../Images/lifeculture_oldhongkong_btn.png'),
          link:'https://www.youtube.com/watch?v=cMS2wqBtdMo&list=PLKF-pTEnmquy5w72IIFxjxWzOMqCpUurc'
        },

        {
          name: '香港有心人',
          icon: require('../Images/lifeculture_goodpeople_btn.png'),
          link:'https://www.youtube.com/watch?v=KNwlM9OD23M&list=PLKF-pTEnmqux7kKCAb94w4CjRbg2yfvRB'
        },

        {
          name: '鏗鏘集',
          icon: require('../Images/lifeculture_hkconnection_btn.png'),
          link:'https://www.youtube.com/watch?v=9QkWooJ61bk&list=PLuwJy35eAVaIDgH7hgOpknp7KPOaibNjN'
        },

        {
          name: '警訊',
          icon: require('../Images/lifeculture_police_btn.png'),
          link:'https://www.youtube.com/watch?v=uLXFJRmo3Wo&list=PLuwJy35eAVaIVFbwcckrMlK2f9j9Iwnbd'
        },

        {
          name: '議事論事',
          icon: require('../Images/lifeculture_policy_btn.png'),
          link:'https://www.youtube.com/watch?v=8On39DnUZI8&list=PLuwJy35eAVaKZSw0JhKOLDIsKj_McTCGZ'
        },

        /*{
          name: '生肖運程',
          icon: require('../Images/lifeculture_fortune2018_btn.png'),
          link:'https://www.youtube.com/watch?v=Q3YlaimAoEA&list=PLlqGIvvQ82UfivwQVtGxumfTs-CTe_f4T&index=1'
        },

        {
          name: 'NFCTest',
          icon: require('../Images/popup_NFCsignin.png'),
          link:'nfcTest'
        },*/

      ],

      musicChannelCells:[

        {
          name: '粵劇經曲',
          icon: require('../Images/musicchannel_opera_btn.png'),
          link:'https://www.youtube.com/watch?v=cEFY3okBOy8&list=PLV56NCfFN89bsNHKWdrGj0_Dp-jAIvfx_'
        },

        {
          name: '流行金曲',
          icon: require('../Images/musicchannel_popsongs_btn.png'),
          link:'https://www.youtube.com/watch?v=Tyn0NcO5gjs&list=PLulqePHuqeT8m0Cwbdprj6tWW0EU95cTt&index=29'
        },

        {
          name: '電視劇名曲',
          icon: require('../Images/musicchannel_tvsongs_btn.png'),
          link:'https://www.youtube.com/watch?v=PkXYbBnuKmo&list=PL8Wry68Q-p72CgQmnqFV8Z_-Ofb5-Nqam'
        },

        {
          name: '金曲串燒',
          icon: require('../Images/musicchannel_songlist_btn.png'),
          link:'https://www.youtube.com/watch?v=mOdJ1pr62JQ&list=PL906028FA8C55C5DE'
        },

      ],

      healthChannelCells:[

        {
          name: '仁濟座式太極(一)',
          icon: require('../Images/healthchannel_taichi01_btn.png'),
          link:'https://www.youtube.com/watch?v=2CfprFwk2PY'
        },

        {
          name: '仁濟座式太極(二)',
          icon: require('../Images/healthchannel_taichi02_btn.png'),
          link:'https://www.youtube.com/watch?v=p2oE99cb6t0'
        },

        {
          name: '怡老按摩',
          icon: require('../Images/healthchannel_massge_btn.png'),
          link:'https://youtu.be/kCRG0i_Z8QA'
        },

        {
          name: '仁濟易筋十段錦',
          icon: require('../Images/healthchannel_tenkam_btn.png'),
          link:'https://www.youtube.com/watch?v=YeCn-6Im9Hg&version=3&hl=en%5FUS'
        }

        /*{
          name: '長者健體運動',
          icon: require('../Images/NEW_healthchannel_elderlyexe_btn.png'),
          link:'https://www.youtube.com/watch?v=7I0NAxDmZrg&index=1&list=PL51B5F0E57A2E7350'
        },

        {
          name: '太極防跌八式',
          icon: require('../Images/NEW_healthchannel_taichi_btn.png'),
          link:'https://www.youtube.com/watch?v=5k96hsFt22w'
        },

        {
          name: '健康操-國語',
          icon: require('../Images/NEW_healthchannel_healthyexe_btn.png'),
          link:'https://www.youtube.com/watch?v=_w50TfdCmKU&list=PLrxBaQG75aeMy1UHC8SrVN9GcU1LMzHiM'
        },

        {
          name: '椅子運動-國語',
          icon: require('../Images/NEW_healthchannel_chairexe_btn.png'),
          link:'https://www.youtube.com/watch?v=YFfCe2p-Kek'
        },*/

      ],

    }

    //this.GetAndCreateEventCells();

  }

  GetAndCreateResidentInfoCells(){
    this.setState({
      healthInfoCells:[],
      dailyNoticeCells:[],
      centreNoticeCells:[]
    });
    fetch(apiServer + 'download/bedside.json')
    .then((response) => response.json())
    .then((responseJson) => {
      let folders = responseJson.Folders;
      console.log(responseJson);
      this.setState({
        healthInfoCells:folders[0].imageCells,
        dailyNoticeCells:folders[1].imageCells,
        centreNoticeCells:folders[2].imageCells
      });
    }).catch((error) => {
      console.error(error)
    });
  }

  GetAndCreateDailyMealCells(){
    this.setState({
      dailyMealCells:[]
    });
    fetch('http://10.0.48.22/EHMS/API/getDiet/' + this.getCurrentDateString())
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.Diet;
    }).then(Diet =>{
      var dishes = ['','','',''];
      Diet.map((data,i)=>{
        /*var dish = '';
        data.MeaDes.split(';').map((des,i)=>{
          console.log(des);
          var subDes = des.split(':');
          console.log(subDes);
          if(subDes.length > 1 && subDes[1] !== ''){
            dish += subDes[1] + '\n';
          }
        });*/
        let index =
        data.MeaTyp === '早餐'? 0:
        data.MeaTyp === '午餐'? 1:
        data.MeaTyp === '茶點'? 2:
        data.MeaTyp === '晚餐'? 3:
        0;
        //console.log(index);
        dishes[index] += data.MeaDes;
      });
      //console.log(dishes);
      this.setState({
        dailyMealCells:[
          {
            name: '早餐',
            icon: require('../Images/dailymeal_breakfast.png'),
            dish: dishes[0],
            meal: true
          },

          {
            name: '午餐',
            icon: require('../Images/dailymeal_lunch.png'),
            dish: dishes[1],
            meal: true
          },

          {
            name: '下午茶',
            icon: require('../Images/dailymeal_tea.png'),
            dish: dishes[2],
            meal: true
          },

          {
            name: '晚餐',
            icon: require('../Images/dailymeal_dinner2.png'),
            dish: dishes[3],
            meal: true
          }
        ]
      })
    })
    .catch(err=>{
      ToastAndroid.show('沒有菜單資訊!',ToastAndroid.SHORT);
      return;
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

  GetAndCreateEventCells(){
    //console.log("GetAndCreateEventCells");
    this.setState({
      eventCells:[]
    });
    let img = [require('../Images/activitynotice_btn01.png'),require('../Images/activitynotice_btn02.png'),require('../Images/activitynotice_btn02.png'),require('../Images/activitynotice_btn01.png')];
    fetch('http://10.0.48.22/EHMS/api/getEvtResBed/')
    .then((response) => response.json())
    .then(response =>{
      //console.log(response);
      return response.EvtResBed;
    }).then(EvtResBed =>{
      var length = EvtResBed.length;
      for (var i = length - 1; i >= 0;i--) {
        let cell = {
          name: EvtResBed[i].EvtNam,
          icon: img[i%4],
          activityNotice: true,
          periodStart: EvtResBed[i].EvtFrDat,
          periodEnd: EvtResBed[i].EvtToDat,
          time: EvtResBed[i].EvtStaTim + ' ~ ' + EvtResBed[i].EvtEndTim,
          deadLine: EvtResBed[i].ErlEndDay,
          weekDay: EvtResBed[i].EvtWkDay,
          venue:EvtResBed[i].Vnu,
          fee: this.getFeeDescription(EvtResBed[i].EvtCosDes),
          reserved: this.getReservedArray(EvtResBed[i].ErlStsDes),
          registered: this.getRegisteredArray(EvtResBed[i].ErlStsDes),

          EvtCod: EvtResBed[i].EvtCod,
          EvtDes: EvtResBed[i].EvtDes,
          TrnrDes: EvtResBed[i].TrnrDes
        }
        this.state.eventCells.splice(0,0,cell)
        //console.log(cell);
      }
    }).then(()=>{
      this.forceUpdate();
    })
  }

  getFeeDescription(feeStr){
    if(feeStr === null){
      return '';
    }
    var feeDesc = feeStr.split(';');
    var returnStr='';
    for(var i=0;i<feeDesc.length;i++){
      var fee = feeDesc[i].split(',');
      var feeValue = fee[1].split('.');
      returnStr += fee[0] + '：$' + feeValue[0] + '  ';
    }
    return returnStr;
  }

  getRegisteredArray(ErlStsDes){
    if(ErlStsDes === null){
      return [];
    }
    let reservedArray = ErlStsDes.split(';');
    for(var i = 0;i<reservedArray.length;i++){
      let array = reservedArray[i].split(',');
      if(array.length === 3 && array[2] === "報名"){
        reservedArray[i] = array[1];
      }else{
        reservedArray[i] = "";
      }
    }
    //console.log(reservedArray);
    return(reservedArray);
  }

  getReservedArray(ErlStsDes){
    if(ErlStsDes === null){
      return [];
    }
    let reservedArray = ErlStsDes.split(';');
    for(var i = 0;i<reservedArray.length;i++){
      let array = reservedArray[i].split(',');
      if(array.length === 3 && array[2] === "留位"){
        reservedArray[i] = array[1];
      }else{
        reservedArray[i] = "";
      }
    }
    //console.log(reservedArray);
    return(reservedArray);
  }

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

}
