import React, { Component } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, Button, ScrollView, Image} from 'react-native'
import styles from './styles.js'
import {Audio} from '../../utils'
import PopupDialog,{DialogTitle} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
export default class Body extends Component{
  constructor(){
    super();
    this.state={
      popup: null,
    };
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
  getFirstAndLastCompletedReminderIndex(array){
    let indexArray=[]
    for(var i = 0 ; i< array.length;i++){
      if(!array[i].completed){
        indexArray.push(i);
      }
    }

    return [indexArray[0], indexArray[indexArray.length - 1]];
  }
  renderReminders(reminders,events){
    let array = reminders.reminders;
    if((array.length < 1 || this.completedReminders(array))&& events.events.length<1){
      return (
        <View>
          <View style={{marginLeft:-35}}>
            <Image style={styles.free}
                source={require('../../images/relax.png')}

              />
          </View>
        </View>
      )
    }
    let css = {marginTop:30};
    let indexes = this.getFirstAndLastCompletedReminderIndex(array);
    return array.map((item, i) => {
      css = {marginTop:30};
      if(i==indexes[indexes.length -1]){
        css = {marginBottom:150};
      }
      else if(i==indexes[0]){
        css={marginTop:15};
      }
      if(!item.completed){
        return (
          <View key={i} style = {[styles.reminder,css]}>
            <View>
              <Image style={styles.image}
                  source={require('../../images/books.jpeg')}
                />
            </View>
            <View style={styles.data}>
              <View style={{flexDirection:'column'}}>
                <View style={{marginLeft:5, maxWidth:250}}>
                  <Text style={styles.about}>{item.about}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{marginTop:10, marginLeft:5}}>
                   <Text style={{fontWeight:'bold', fontSize:15}}>{this.renderIf(item.time, item.time,"CELODNEVNI")}</Text>
                  </View>
                  {this.renderMic(item)}
                </View>
              </View>
                <View style={styles.menu}>
                      <Menu>
                        <MenuTrigger customStyles={styles.menuTrigger}
                        text='VEČ' />
                        <MenuOptions>
                          <MenuOption onSelect={() => {this.props.editReminder(i,item.id)}} text='Uredi' />
                          <MenuOption onSelect={() => {this.props.deleteReminder({i : i, index:this.props.index, date:item.date})}} text='Izbriši'>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                </View>
                <View style={{position:'absolute',right:10}}>
                  <TouchableOpacity style={{marginLeft:30,marginTop:30}} onPress={() =>{this.props.completeReminder({i, date:item.date})}}>
                    <Icon name="md-checkmark" style={styles.icon}/>
                  </TouchableOpacity>
                </View>
              <View style={styles.type}>
               <Text>OPOMNIK</Text>
              </View>
            </View>
        </View>
        )
      }
     })
  }

  renderEvents(reminders){
    let array = reminders.events;
    if(array.length < 1){
      return null;
    }
    return array.map((item, i) => {
      if(!item.completed){
        return (
          <View key={i} style = {[styles.reminder]}>
            <View>
              <Image style={styles.image}
                  source={require('../../images/books.jpeg')}
                />
            </View>
            <View style={styles.data}>
              <View style={{flexDirection:'column'}}>
                <View style={{marginLeft:5, maxWidth:250}}>
                  <Text style={styles.about}>{item.about}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{marginTop:10, marginLeft:5}}>
                   <Text style={{fontWeight:'bold', fontSize:15}}>{this.renderIf(item.from, item.from + "-" + item.to,"CELODNEVNI")}</Text>
                  </View>
                  {this.renderMic(item)}
                </View>
              </View>
                <View style={styles.menu}>
                      <Menu>
                        <MenuTrigger customStyles={styles.menuTrigger}
                        text='VEČ' />
                        <MenuOptions>
                          <MenuOption onSelect={() => {this.props.editEvent(i,item.id)}} text='Uredi' />
                          <MenuOption onSelect={() => {this.props.deleteEvent({i : i, index:this.props.index, date:item.date})}} text='Izbriši'>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                </View>
              <View style={styles.type}>
               <Text>DOGODEK</Text>
              </View>
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
    let {reminders,events}  = this.props;
    return(
          <View style={{flex: 1, backgroundColor: '#f6f6f6', flexDirection:'column' }}>
              <ScrollView ref={ref => this.scrollView = ref}
                          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true})}}>
                          {this.renderEvents(events)}
                          {this.renderReminders(reminders,events)}
              </ScrollView>
              <View style={{position:'absolute', top:-90}}>
                <PopupDialog ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                  haveOverlay	={false}
                  dialogTitle={<DialogTitle title="Audio zapiski" />}
                  height={0.6}
                  width={0.8}
                  >
                    <ScrollView>
                      {this.state.popup}
                    </ScrollView>
                </PopupDialog>
              </View>
            </View>
    );
  }
}
