import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, TextInput, ScrollView} from 'react-native'
import Form from './Form'
import {addEvent,editEvent} from './module'
import utils from '../utils'
let {Audio} = utils;

class Event extends Component{
  addEvent(payload){
    let {about,from,to,recordings,alarm} = payload;
    let {index} = this.props.payload;
    let {date} = this.props;
    let newPayload = {about,from,to,recordings,index,date,alarm}
    this.props.addEvent(newPayload);
  }
  editEvent(payload){
    let {about,from,to,recordings,alarm} = payload;
    let {index, id} = this.props.payload;
    let {date} = this.props;
    let newPayload = {about,from,to,alarm,recordings,index,date, i : this.props.payload.i, id}
    this.props.editEvent(newPayload);
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
    let {index} = this.props.payload;1

    return(
      <View style={{flex:1}}>
            <Form
              payload={this.props.payload}
              playRec={this.playRecording.bind(this)}
              deleteRec={this.deleteRecording.bind(this)}
              stopRecording = {this.stopRecording}
              startRecording={this.startRecording.bind(this)}
              addEvent={this.addEvent.bind(this)}
              editEvent={this.editEvent.bind(this)}
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
  addEvent : (payload) => {dispatch(addEvent(payload))},
  editEvent :(payload) => {dispatch(editEvent(payload))}
})
const mapStateToProps = (state,props) => {
    return{
        date : state.days[props.payload.index].date,
        reminder:state.events[props.payload.index].events[props.payload.i]
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Event)
