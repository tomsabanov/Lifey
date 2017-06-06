import React, { Component } from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import ActionButton from './ActionButton'
import Icon from 'react-native-vector-icons/Ionicons'
import Blur from './Blur'

const window = Dimensions.get('window');

class FloatingActionButton extends Component{
  render(){
    return(
        <ActionButton position={"right"} buttonColor="#2fbdd2" hideShadow={false} offsetX={40} offsetY={7} backdrop={<Blur/>} style={styles.actionButton} size={60}>
          <ActionButton.Item buttonColor='#2fbdd2' title="Opomnik" onPress={this.props.Reminder}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#2fbdd2' title="Dogodek" onPress={this.props.Event}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
    color: 'white',
  },
  actionButton:{
    height:50
  },
});

module.exports=FloatingActionButton;
