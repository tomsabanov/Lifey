import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, TextInput, ScrollView} from 'react-native'
import Form from './Form'
import {addReminder,editReminder} from './module'
import utils from '../utils'
let {Audio} = utils;

class Reminder extends Component{
  addReminder(payload){
    let {about,time,recordings} = payload;
    let {index} = this.props.payload;
    let {date} = this.props;
    let newPayload = {about,time,recordings,index,date}
    this.props.addReminder(newPayload);
  }
  editReminder(payload){
    let {about,time,recordings} = payload;
    let {index, id} = this.props.payload;
    let {date} = this.props;
    let newPayload = {about,time,recordings,index,date, i : this.props.payload.i, id}
    this.props.editReminder(newPayload);
  }

  startRecording(num){
    Audio.startRec(this.props.date, num);
  }
  stopRecording(){
    Audio.stopRec();
  }
  playRecording(num){
    Audio.playRec(this.props.date, num)
  }
  deleteRecording(num){
    Audio.deleteRec(this.props.date, num);
  }

  render(){
    let {navigator,date,reminder,i} = this.props;
    let {index} = this.props.payload;

    return(
      <View style={{flex:1}}>
            <Form
              payload={this.props.payload}
              playRec={this.playRecording.bind(this)}
              deleteRec={this.deleteRecording.bind(this)}
              stopRecording = {this.stopRecording}
              startRecording={this.startRecording.bind(this)}
              addReminder={this.addReminder.bind(this)}
              editReminder={this.editReminder.bind(this)}
              navigator={navigator}
              text={this.props.payload.text}
              reminder={reminder}
              i = {i}
            />
      </View>
    );
  }
}

import {connect} from 'react-redux';
const mapDispatchToProps = (dispatch) => ({
  addReminder : (payload) => {dispatch(addReminder(payload))},
  editReminder :(payload) => {dispatch(editReminder(payload))}
})
const mapStateToProps = (state,props) => {
    return{
        date : state.days[props.payload.index].date,
        reminder:state.reminders[props.payload.index].reminders[props.payload.i]
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Reminder)
