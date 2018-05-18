import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const viewStyles = StyleSheet.create({
  cell: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginVertical: width * -0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
      width: width * 0.35,
      height: width * 0.35,
      resizeMode: 'contain'
  }
});
const textStyles = StyleSheet.create({
  cellName: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.04,
    textAlign: 'center',
    margin: width * 0.025,
    color:'white',
    position:'absolute'
  },
  dishName: {
    fontFamily: 'adobestdb',
    fontSize: width * 0.03,
    textAlign: 'center',
    margin: width * 0.025,
    color:'black',
    position:'absolute',
    paddingTop: width * 0.075
  }
});

export default class Cell extends Component<{}> {
  render() {
    let iconPath = this.props.property.icon;
    let nameToShow =
    this.props.property.activityNotice? this.props.property.name:
    this.props.property.meal? this.props.property.dish:
    '';

    if(this.props.property.meal){
      return (
        <View style={[viewStyles.cell,{backgroundColor:'transparent'}]}>
          <View style={[viewStyles.button,{backgroundColor:'transparent'}]}>
            <Image source={this.props.property.icon} style={viewStyles.icon} />
            <Text style={textStyles.dishName}>{nameToShow}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[viewStyles.cell,{backgroundColor:'transparent'}]}>
        <TouchableOpacity style={[viewStyles.button,{backgroundColor:'transparent'}]} onPress={()=>this.props.onCellPressed(this.props.property)}>
          <Image source={this.props.property.icon} style={viewStyles.icon} />
          <Text style={textStyles.cellName}>{nameToShow}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
