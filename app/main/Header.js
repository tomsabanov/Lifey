import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.item}>
          <TouchableOpacity>
              <Icon name="md-menu" style={styles.menu} />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Lifey</Text>
        </View>
        <View style={styles.cal}>
          <TouchableOpacity onPress={this.props.popup}>
              <Icon name="md-calendar" style={styles.menu} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  header : {
    flex:1,
    backgroundColor:'#2fbdd2',
    flexDirection:'row',
  },
  text : {
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  },
  menu:{
    fontSize:30,
    color:'white'
  },
  item:{
    margin : 10,
  },
  calendar:{
    fontSize:30,
    color:'white',
  },
  cal:{
    position:'absolute',
    right:30,
    top:10,
  }

}
