import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

class Header extends Component{
  shouldComponentUpdate(nextProps,nextState){
    let{day} = this.props;
    if(day == nextProps.day){
      return false;
    }
    return true;
  }
  render(){
		let {onClickOpenControlPanel,day} = this.props;
    return(
          <View style={styles.header}>
            <View style={styles.block}>
              <Text style={styles.text}>{day}</Text>
            </View>
          </View>
    );
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor:'#2fbdd2',
    alignItems:'center',
    flexDirection:'column'
  },
  text:{
    fontSize:18,
    color:'white',
    fontWeight:'bold',
    marginBottom:8,
  },
  block:{
    borderBottomColor:'white',
    borderBottomWidth:1.5,
  }
});

module.exports = Header;
