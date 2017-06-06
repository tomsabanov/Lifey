import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {View, Text,TouchableOpacity, TextInput, Switch, TimePickerAndroid} from 'react-native'
import styles from './styles'


export default class Form extends Component{
  constructor(props){
    super()
    let SwitchIsOn =true;
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
     h = (h < 9) ? "0" + h : h;
     m = (m < 9) ? "0" + m : m;
    let time =h + ":" + m;
    let recordings = [];
    let num = 1;
    let about = "";
    if(props.reminder){
      if(props.reminder.time != false){
        time = props.reminder.time;
        SwitchIsOn = false;
      }
        recordings = props.reminder.recordings;
        if(props.reminder.recordings.length>0){
          num = props.reminder.recordings[props.reminder.recordings.length -1].num;
        }
        about = props.reminder.about;
    }
    this.state={
      about:about,
      time:time,
      SwitchIsOn:SwitchIsOn,
      audioFloat : false,
      isRecording : false,
      recordings:recordings,
      num:num,
    };
  }
  _save(){
    let {about,time,recordings} = this.state;
    if(about!="" || recordings.length!=0){
      if(this.state.SwitchIsOn){
        time = false;
      }
      let payload = {about,time,recordings};
      if(this.props.reminder){
        payload.i = this.props.i;
        this.props.editReminder(payload)
      }
      ///klele not se lahko malenkost še poštima logiko...glede na reminder iz propov....
      /*
        Ubistvu bi klele lahko imel samo addReminder, pr mongoDB mamo update pa upsert da vstavmo nov dokument....
      */
      else{
        this.props.addReminder(payload)
      }
      this.props.navigator.pop()
    }
  }
  _close(){
    this.props.navigator.pop()
    let {recordings} = this.state;
    for(var i = 0; i<recordings.length; i++){
      this.props.deleteRec(recordings[i].num)
    }

  }
  _switch(value){

    if(value==true){
      this.setState({SwitchIsOn:value});
    }
    else{
      let d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();
       h = (h < 9) ? "0" + h : h;
       m = (m < 9) ? "0" + m : m;

      this.setState({SwitchIsOn:value, time:h + ":" + m});
    }
  }

  async _pickTime(){
    let d = new Date();
    try {
        let {action, hour, minute} = await TimePickerAndroid.open({
                                    hour:parseInt(this.state.time.substring(0,2)),
                                    minute: parseInt(this.state.time.substring(3,5)),
                                    is24Hour: true,
                                  });
        if (action !== TimePickerAndroid.dismissedAction) {
          let h = (hour < 9) ? "0" + hour : hour;
          let m = (minute < 9) ? "0" + minute : minute;
          this.setState({time:h +":"+m})
        }
    }
    catch ({code, message}) {
        console.warn('Cannot open time picker', message);
    }
  }

  addRecording(){
    let {recordings} = this.state;
    var arrayvar = this.state.recordings.slice();
    let object = {num : this.state.num };
      arrayvar.push(object)
    this.setState({recordings: arrayvar,isRecording:!this.state.isRecording,num:this.state.num +1});
    this.props.stopRecording()
  }

  deleteRecording(index){
    let {recordings} = this.state;
    var rec = this.state.recordings.slice();
    rec.splice(index, 1);
    this.setState({recordings : rec});
  }

  showRecordings(recordings){
    return recordings.map((data, index) => {
      return (
      <View style={styles.items} key={index}>
        <View><Text>{data.num}</Text></View>
        <TouchableOpacity onPress={() => {this.props.playRec(data.num)}}>
          <Icon name="md-play" style={[styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{this.props.deleteRec(data.num); this.deleteRecording(index)}}>
          <Icon name="md-trash" style={[styles.icon]} />
        </TouchableOpacity>
      </View>
      )
    })
  }
  renderIf(statement, content){
    if(statement){
      return statement.about;
    }
    return content;
  }

  render(){
    let {text} = this.props;
    let reminder = undefined;
    let saveEdit = "SHRANI";
    if(this.props.reminder){
       reminder = this.props.reminder;
       saveEdit = "POSODOBI";
    }

    let time = (this.state.SwitchIsOn) ? <Text style={styles.time}>Celodnevni</Text> : <TouchableOpacity style={styles.time} onPress={this._pickTime.bind(this)}><Text>{this.state.time}</Text></TouchableOpacity>;
    let recordingText = (!this.state.isRecording) ?
    <TouchableOpacity style={{marginTop:5}} onPress={() => { this.setState({isRecording:!this.state.isRecording});this.props.startRecording(this.state.num)}}>
    <Text>Začni snemanje</Text></TouchableOpacity> :
    <TouchableOpacity style={{marginTop:5}}  onPress={this.addRecording.bind(this)}>
    <Text>Končaj snemanje</Text></TouchableOpacity>
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          <View style={{flex: 2}}>
            <TouchableOpacity onPress={this._close.bind(this)}>
              <Icon name="md-close" style={[styles.headerbuttons]} />
            </TouchableOpacity>
          </View>
          <View style={{flex:5, marginTop:5}}>
            <TextInput
              style={styles.textinput}
              onChangeText={(about) => this.setState({about})}
              value={this.state.text}
              placeholder={this.renderIf(reminder, "Opomni me glede...")}
              placeholderTextColor={"#FFFFFF"}
              underlineColorAndroid={"#2fbdd2"}
              multiline={true}
            />
          </View>
          <View style={{flex:3}}>
            <TouchableOpacity onPress={this._save.bind(this)}>
              <Text style={[styles.headerbuttons, styles.save]}>{saveEdit}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:9}}>
          <View style={styles.items}>
              <Icon name="md-time" style={styles.icon}/>
              {time}
              <Switch
              onValueChange={(value) => this._switch(value)}
              style={{marginBottom: 10}}
              value={this.state.SwitchIsOn} />
          </View>
          <View>
          <View style={styles.items}>
              <Icon name="md-mic" style={styles.icon}/>
              <Text style={{marginTop:5, marginRight:30}}>Dodaj audio-zapisek</Text>
              {recordingText}
          </View>

          {this.showRecordings(this.state.recordings)}

          </View>

        </View>


      </View>
    );
  }
}
