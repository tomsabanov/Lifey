import React,{Component} from 'react';
import {View,Dimensions} from 'react-native';
export default class Blur extends Component {
    render(){
        width = Dimensions.get('window').width;
        height = Dimensions.get('window').height;
        return (
            <View style={{position:'absolute',top:0,left:0,height:height,width:width,backgroundColor:'white',opacity:0.9,}}></View>
        )
    }
}
