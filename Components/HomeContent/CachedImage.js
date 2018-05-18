import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class CachedImage extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      img: null
    }
    //console.log('CachedImage')
    this.getCacheImage();
  }

  async getCacheImage(){
    var localData = await this.props.mainFunctions.asyncFetch(this.props.imgName);
    //var localDataTimestamp = await this.props.mainFunctions.asyncFetch('timestamp:' + this.props.cacheStatus.id);
    //var useLocalData = ((localData !== null) && (localDataTimestamp === this.props.cacheStatus.timestamp.toString()));
    var useLocalData = (localData !== null);
    //console.log('useLocalData: ' + useLocalData);

    if(!useLocalData){
      var toFetch = this.props.apiServer + 'download/' + this.props.imgName;
      console.log(toFetch)
      RNFetchBlob.fetch('GET',toFetch).then(res => {

        //console.log(this.props.cacheStatus.url);

        let base64Str = res.data;
        let mimetype_attachment = 'image/png';
        var imageBase64 = 'data:'+mimetype_attachment+';base64,'+base64Str;

        this.setState({
          img: imageBase64
        });
        this.props.mainFunctions.asyncStore(this.props.imgName, res.uri);

        /*ImageResizer.createResizedImage(imageBase64, 2048, 2048, 'JPEG', 100, 0, null)
        .then(res => {
          this.setState({
            img: res.uri
          });
          this.props.mainFunctions.asyncStore(this.props.imgName, res.uri);
        }).catch(err => {
          ToastAndroid.show('Image resize failed!',ToastAndroid.SHORT);
        });*/

      }).catch(err => {
        ToastAndroid.show('Failed to load image!',ToastAndroid.SHORT);
      });
    } else {
      console.log('useLocalData')
      this.setState({
        img: localData
      })
    }
  }

  render(){

    return(
      <Image style={this.props.style} source={{uri: this.state.img, scale: 1}}/>
    )
  }

}
