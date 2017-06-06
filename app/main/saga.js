import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import {API} from '../API'

import functions from './functions'

export function* days(){
  yield takeEvery("SWIPEDAYS", loadDay);
  yield takeEvery("getPreviewDay", getPreviewDay);
  yield takeEvery("NAVIGATE_DAY", navigateDay)
}

function* navigateDay(action){
  let {payload} = action;
  let {day,date, indexY, indexT, yesterday, tommorow} = payload;
  let reminders = [];
  if(day.day.reminders.length > 0){
    reminders =day.day.reminders;
    delete day.day.reminders;
  }

  yield  put({ type: 'UPDATE_REMINDERS', payload:{reminders:reminders,index:day.day.id,} })
  yield  put({ type: 'UPDATE_DAY', payload:{day:day.day,index:day.day.id,} })
  ///-------------- posodobimo srednji dan, zdaj pa mormo še prejšnega in naslednjega posodobit....

  yield loadDay({payload:{
    newDay:yesterday,
    index:indexY,
  }})
  yield loadDay({payload:{
    newDay:tommorow,
    index:indexT,
  }})
}


function* getPreviewDay(action){
  let {payload} = action;
  let day  = yield call(API.fetchDay,payload.date)
  const state = yield select();
  let newDay = {
    date:payload.date,
    id:state.days.currentIndex,
    momentObj:payload.momentObj,
    toString:payload.toString,
    reminders:[]
  }
  if(day!=null){
    newDay.reminders = day.reminders;
  }
  yield put({type:'UPDATE_PREVIEW_DAY', payload:{day:newDay}})
}

function* loadDay(action){
  let {payload} = action;
  let day  = yield call(API.fetchDay,payload.newDay.date)
  if(day!=null){
    let momentObj = payload.newDay.momentObj;
    let newDay = {
      date:day._id,
      id:payload.index,
      momentObj:momentObj,
      toString:payload.newDay.toString
    }
    payload.newDay = newDay;
    payload.reminders=day.reminders;
    payload.events = day.events;
  }
  else{
    payload.reminders = []
    payload.events = []
  }
  yield  put({ type: 'UPDATE_DAY', payload:{day:payload.newDay,index:payload.index, currentIndex:payload.currentIndex} })
  yield put({ type: 'UPDATE_REMINDERS', payload:{reminders:payload.reminders,index:payload.index,} })
  yield put({ type: 'UPDATE_EVENTS', payload:{reminders:payload.events,index:payload.index,} })
  /*
  Tole s promisi pa sago bo treba še malo na študirat, ker tole ni uredu....
  */
}
