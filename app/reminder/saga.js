import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {API} from '../API'

export function* reminders(){
  yield takeEvery("ADD_REMINDER", addReminder);
  yield takeEvery("DELETE_REMINDER", deleteReminder)
  yield takeEvery("EDIT_REMINDER", editReminder)
  yield takeEvery("COMPLETE_REMINDER", completeReminder)
}

function* addReminder(action){
  let {payload} = action;
  yield call(API.addReminder, payload)
  yield put({ type: 'ADDREMINDER', payload})
}

function* deleteReminder(action){
  let {payload} = action;
  yield call(API.deleteReminder, payload)
  yield put({type: 'DELETEREMINDER',payload})
}
function* editReminder(action){
  let {payload} = action;
  yield call(API.editReminder, payload)
  yield put({type: 'EDITREMINDER',payload})
}
function* completeReminder(action){
  let{payload} = action;
  yield call(API.completeReminder, payload)
  yield put({type:'COMPLETEREMINDER', payload})
}
