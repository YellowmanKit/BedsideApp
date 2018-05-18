import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  cell: {
    flex: 0.5,
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
const textStyles = StyleSheet.create({
});

function getTimeString(date) {

  let hr = date.getHours();
  let min = date.getMinutes();
  let timeStr = "";
  if(hr < 12){
    timeStr += "上午 ";
  }else{
    timeStr += "下午 ";
    if(hr > 12){
      hr -= 12;
    }
  }
  hrStr = addZeroIfSingle(hr);
  minStr = addZeroIfSingle(min);
  timeStr += hrStr + ':' + minStr + '\n';
  return timeStr;
}

function getDateString(date) {

  let year = date.getFullYear();
  let monthIndex = date.getMonth() + 1;
  let day = date.getDate();

  let dateStr = year + '年' + monthIndex + '月' + day + '日\n';
  return dateStr;
}

function getWeekDayString(date) {
  let weekDayNames = [
     "一", "二", "三",
     "四", "五", "六", "日"
   ];

  let weekDay = date.getDay();

  let weekDateStr = '星期' + weekDayNames[weekDay - 1];
  return weekDateStr;
}

function addZeroIfSingle(num){
  if(num < 10){
    return '0' + String(num);
  }else{
    return '' + String(num);
  }
}

export default class Clock extends Component<{}> {
  constructor(props) {
     super(props);
     this.state = {
       time: getTimeString(new Date()),
       date: getDateString(new Date()),
       day: getWeekDayString(new Date())
     };
   }
   componentDidMount() {
     this.intervalID = setInterval(
       () => this.tick(),
       1000
     );
   }
   componentWillUnmount() {
     clearInterval(this.intervalID);
   }
   tick() {
     this.setState({
       time: getTimeString(new Date()),
       date: getDateString(new Date()),
       day: getWeekDayString(new Date())
     });
   }

   render() {
     return (
       <View>
         <Text style={{
          fontSize: width * 0.04,
          fontFamily: 'adobestdb',
          textAlign: 'center',
          color: this.props.atHome?'grey':'white'
         }}>
           {this.state.time}
         </Text>

         <Text style={{
           fontSize: width * 0.0275,
           fontFamily: 'adobestdb',
           textAlign: 'center',
           color: this.props.atHome?'grey':'white'
         }}>
           {this.state.date}
         </Text>

         <Text style={{
           fontSize: width * 0.0275,
           fontFamily: 'adobestdb',
           textAlign: 'center',
           color: this.props.atHome?'grey':'white'
         }}>
           {this.state.day}
         </Text>

       </View>
     );
   }

}
