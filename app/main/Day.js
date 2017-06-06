import React, { Component } from 'react'
import {View, Text,TouchableOpacity,DeviceEventEmitter} from 'react-native'

import Header from './day/Header'
import Body from './day/Body'

import {deleteReminder,completeReminder} from '../reminder/module'
import {deleteEvent} from '../event/module'

import utils from '../utils';
let {PushNotification} = utils;

class Day extends Component{
 editReminder(i,id){
   let payload = {i, id, index:this.props.index, text : "Posodobi opomnik", type : 1}
   this.props.navigator.push({name:"Reminder", payload})
 }
 editEvent(i,id){
   let payload = {i, id, index:this.props.index, text : "Posodobi dogodek", type : 1}
   this.props.navigator.push({name:"Event", payload})
 }
  render(){
		let {day,reminders, previewDay,events} = this.props;
    return(
      <View style={{flex:1, flexDirection:'column'}}>
          <Header style={{flex:1}}  day={day.toString}/>
          <Body   style={{flex:9}} index={this.props.index} editReminder={this.editReminder.bind(this)} deleteReminder={this.props.deleteReminder}
                  completeReminder={this.props.completeReminder} reminders={reminders} editEvent={this.editEvent.bind(this)} deleteEvent={this.props.deleteEvent} events={events}/>
      </View>
    );
  }
}
import { connect } from 'react-redux'
const mapDispatchToProps = (dispatch, props) => ({
    deleteReminder : (payload) => {dispatch(deleteReminder(payload))},
    deleteEvent : (payload) => {dispatch(deleteEvent(payload))},
    completeReminder : (payload) => {dispatch(completeReminder({i:payload.i,index:props.index, date:payload.date}))}
})
const mapStateToProps = (state,props) => {
   return {
     day : state.days[props.index],
     reminders: state.reminders[props.index],
     events : state.events[props.index]
   }
};
export default connect(mapStateToProps,mapDispatchToProps)(Day)
