import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, Button, ScrollView, Image} from 'react-native'
import styles from './styles.js'
import {Audio} from '../../utils'
import Icon from 'react-native-vector-icons/Ionicons';

export default class PreviewDay extends Component{

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  playRecording(date, num){
    Audio.playRec(date, num) // tele stvari bi prek APIja mogu pč
  }

  renderRecordings(recordings,date){
    return recordings.map((item, index) => {
        return (
          <View key={index} style={styles.recordingView}>
            <View style={styles.textView}>
                <Text style={[styles.about,styles.index]}>Audio zapisek št.{index}</Text>
            </View>
            <View style={{marginTop:10,marginLeft:30}}>
              <TouchableOpacity onPress={() => {this.playRecording(date, item.num)}}>
                <Icon name="md-play" style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </View>
        )

    })
  }
  renderMic(item){
    if(item.recordings.length > 0){
      return(
        <View style={{marginTop:8, marginLeft:15}}>
            <TouchableOpacity onPress={() => {this.setState({popup:this.renderRecordings(item.recordings,item.date)});
                                              this.popupDialog.show()}}>
                <Icon name="md-volume-up" style={styles.icon} />
            </TouchableOpacity>
        </View>
      )
    }
    return null;
  }
  renderIf(statement,contentTrue, contentFalse){
    if(statement){
      return contentTrue;
    }
    return contentFalse;
  }
  completedReminders(array){
    for(let i = 0; i<array.length; i++){
      if(!array.completed){
        return false;
      }
    }
    return true;
  }

  renderReminders(reminders){
    return reminders.map((item, i) => {
      if(!item.completed){
        return (
          <View key={i} style = {{flexDirection:'column',
          elevation:5,
          marginTop:10,
          backgroundColor:'white',
          height:40,}}>
              <View style={{flexDirection:'column'}}>
                <View style={{left:2, maxWidth:60, position:'absolute'}}>
                  <Text style={{fontSize:11,
                  color:'black',}}>{item.about}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{position:'absolute', top:20, right:5}}>
                   <Text style={{fontWeight:'bold', fontSize:11}}>{this.renderIf(item.time, item.time,"CELODNEVNI")}</Text>
                  </View>
                </View>
              </View>
              <View style={{position:'absolute',
              right:10,
              top:0,}}>
               <Text style={{fontSize:11}}>OPOMNIK</Text>
              </View>
        </View>
        )
      }
     })
  }
/*
Pri edit reminder je id reminderja kar njegova pozicija v arrayu....
 ----> naj bo reminders kar objekt objektov tipa reminder...... mogu bom potem sprement api  + render funkcije
*/

  render(){
    if(this.props.day != undefined && this.props.day.reminders!= undefined){
      let {reminders}  = this.props.day;
      if(reminders.length > 0){
        return(
              <View style={{flex: 1, backgroundColor: '#f6f6f6', flexDirection:'column' }}>
                  <ScrollView ref={ref => this.scrollView = ref}
                              onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true})}}>
                              {this.renderReminders(reminders)}
                  </ScrollView>
                </View>
        );
      }
      return (
        <View style={{flex: 1, backgroundColor: '#f6f6f6', flexDirection:'column' }}>
          <View>
            <Image style={styles.free}
                source={require('../../images/time.png')}
                width={130}
                height={40}
              />
          </View>
        </View>
      );
    }
    return null;
  }



}
