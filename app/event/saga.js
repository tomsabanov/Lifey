import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {API} from '../API'

export function* events(){
  yield takeEvery("ADD_EVENT", addEvent);
  yield takeEvery("DELETE_EVENT", deleteEvent)
  yield takeEvery("EDIT_EVENT", editEvent)
}

function* addEvent(action){
  let {payload} = action;
  yield call(API.addEvent, payload)
  yield put({ type: 'ADDEVENT', payload})
}

function* deleteEvent(action){
  let {payload} = action;
  yield call(API.deleteEvent, payload)
  yield put({type: 'DELETEEVENT',payload})
}
function* editEvent(action){
  let {payload} = action;
  yield call(API.editEvent, payload)
  yield put({type: 'EDITEVENT',payload})
}
