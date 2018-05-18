import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const viewStyles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
      width: Dimensions.get('window').width * 0.12,
      height: Dimensions.get('window').width * 0.12,
  }
});
const textStyles = StyleSheet.create({
  standard: {
    fontSize: Dimensions.get('window').width * 0.03,
    textAlign: 'center',
    color:'black',
  }
});

export default class ContentCell extends Component<{}> {

  render() {
    if(this.props.property != ''){
      return (
        <TouchableOpacity style={viewStyles.cell} onPress={()=>this.props.ShowContentWebView(this.props.property.link)}>
          <Image source={this.props.property.icon} style={viewStyles.icon} />
          <Text style={textStyles.standard}> {this.props.property.name} </Text>
        </TouchableOpacity>
      );
    }else{
      return(
        <View>
        </View>
      );
    }
  }

}
