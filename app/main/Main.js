import React, { Component } from 'react'
import {View, Navigator, BackAndroid,Text, TouchableOpacity, TouchableHighlight} from 'react-native'
import Swiper from 'react-native-swiper'
import FloatingActionButton from './FAB/FloatingActionButton'
import AndroidBackButton from "react-native-android-back-button"
import Day from './Day'
import {swipeDays,getPreviewDay,navigate} from './module'
import Header from './Header'
import PopupDialog,{DialogTitle} from 'react-native-popup-dialog';
import CalendarPicker from 'react-native-calendar-picker';
import PreviewDay from './day/PreviewDay'
import Icon from 'react-native-vector-icons/Ionicons';

let index = 1;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      previewVisible:false,
      showPopup : false,
    };
    this.onDateChange = this.onDateChange.bind(this);

  }
  popIfExists() {
      let navigator=this.props.navigator;
      if (navigator.getCurrentRoutes().length > 1) {
        navigator.pop()
        return true // do not exit app
      } else {
        return false // exit app
      }
  }
  _onMomentumScrollEnd(e, state, context) {
      if(state.index==0 && index==2){index=-1;}
      if(state.index==2 && index==0){index=3;}
      if(state.index == index +1){
        this.props.swipeDays(++index,"forward");
      }
      else{
        this.props.swipeDays(--index,"backwards");
      }
  }
  _addReminder() {
     return this.props.navigator.push({name:"Reminder",payload:{index : index, text : "Dodaj opomnik", type:0}});
  }
  _addEvent() {
     return this.props.navigator.push({name:"Event",payload:{index : index, text : "Dodaj dogodek", type:0}});
  }
  onDateChange(date) {
    let string=date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate();
    let d= date.getDate() + "." + (date.getMonth() +1) + "." + date.getFullYear();
    this.props.getPreviewDay(string,d);
    this.setState({
      selectedStartDate: date,
      previewVisible:true,
    });
  }
  renderPreview(day){
    if(this.state.previewVisible){
      let date = this.state.selectedStartDate;
      let css ={left:10};
      if(date.getDay() < 3){
        css={
          right:10
        }
      }
      return  (
        <View style={[{position:'absolute', top:25 ,width:130,height:230, borderWidth:2,borderColor:'#2fbdd2', zIndex:9999},css]}>
            <PreviewDay day={day.day}></PreviewDay>
            <View style={{flexDirection:'row', justifyContent:'center',backgroundColor:'#2fbdd2'}}>
              <View style={{marginRight:20}}>
                <TouchableOpacity onPress={() => this.setState({previewVisible:false,})}>
                  <Icon name="md-close" style={styles.icon}/>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft:20}}>
                <TouchableOpacity onPress={() => {this.props.navigate({day,date});this.setState({previewVisible:false, showPopup:false})}}>
                  <Icon name="md-arrow-forward" style={styles.icon}/>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    let {navigator, previewDay} = this.props;
    return (
      <View style={{flex:1,}}>
        <View style={{flex:0.6,}}>
            <Header popup={() => {this.setState({showPopup:true, previewVisible:false});this.popupDialog.show()}}></Header>
        </View>
        <View style={{flex:9.4, backgroundColor:'#f6f6f6'}}>
          <View style={{flex:1,}}>

            <Swiper
              showsPagination={false}
              loop={true}
              onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)}
              index={1}

              >
              <Day   navigator={navigator} index={0}/>
              <Day   navigator={navigator} index={1}/>
              <Day   navigator={navigator} index={2}/>
            </Swiper>

          </View>
        </View>
        <FloatingActionButton Reminder={this._addReminder.bind(this)} Event={this._addEvent.bind(this)}/>
        <AndroidBackButton onPress={this.popIfExists.bind(this)}/>
        <PopupDialog ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            haveOverlay	={false}
            height={0.45}
            width={0.9}
            overlayBackgroundColor	="#FFF"
            overlayOpacity={0.9}
            haveOverlay={true}
            show = {this.state.showPopup}
            >
              <View style={{borderWidth:0.5,borderColor:'#000', zIndex:1}}>
                <View style={{zIndex:-330}}>
                  <CalendarPicker
                      onDateChange={this.onDateChange.bind(this)}
                      selectedDayColor="#2fbdd2"
                      weekdays={['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob']}
                      months={['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']}
                      selectedDayTextColor="#FFFFFF"
                      onDateChange={this.onDateChange}
                  />
                </View>
                  {this.renderPreview(previewDay)}
              </View>
          </PopupDialog>
      </View>
    );
  }
}
import { connect } from 'react-redux'
const mapStateToProps = (state,props) => {
   return {
     previewDay: state.days.previewDay,
   }
};
const mapDispatchToProps = (dispatch, props) => ({
    swipeDays : (index, direction) => {dispatch(swipeDays({index,direction}))},
    getPreviewDay : (date,d) => {dispatch(getPreviewDay(date,d))},
    navigate : (day) => {dispatch(navigate(day))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Main)
