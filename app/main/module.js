import functions from './functions'
let {getDay, getIndexRight, getIndexLeft, newDay, getDayToString}  = functions;
import utils from '../utils'
let {yesterday, tommorow, today, moment } = utils;

let currentIndex = 0;

export default days = {
    0:getDay(0, yesterday),
    1:getDay(1, today),
    2:getDay(2, tommorow),
    previewDay:{date:"00.00.0000"},
    currentIndex: 1,
}

export function swipeDays(payload) {
  let {index, direction} = payload;
  currentIndex=index;
  let add=0;
  if(direction=="forward") {index = functions.getIndexRight(index);add=3;}
  else{index = functions.getIndexLeft(index);add=-3;}
  let DAY = functions.newDay(days[index], add);
  let reminders = {id : index, reminders:[]}
  return {
    type:"SWIPEDAYS",
    payload:{ index,reminders, newDay:DAY, currentIndex}
  }
}
export function getPreviewDay(string,date){
  let payload = {};
  payload.date=date;
  payload.momentObj = moment(string,"YYYY-MM-DD");
  payload.toString=getDayToString(payload.momentObj);
  return {
    type:"getPreviewDay",
    payload:payload
  }
}
export function navigate(payload){
  days[payload.day.day.id] = payload.day.day; // setal torej tisti dan na katerga se navigiramo na indexu 1... torej "today"
  let indexY=1;
  let indexT=0;
  if(payload.day.day.id == 0){
    indexY=2;
    indexT=1;
  }
  else if(payload.day.day.id == 1){
    indexT=2;
    indexY=0;
  }

  payload.indexY = indexY;
  payload.indexT = indexT;
  const moment1 = moment(payload.day.day.momentObj._i,"YYYY-MM-DD")
  const moment2 = moment(payload.day.day.momentObj._i,"YYYY-MM-DD")

  let tommorow = getDay(indexY,  moment1.add(1,'days'))
  let yesterday = getDay(indexY, moment2.add(-1,'days'))
  payload.yesterday = yesterday;
  payload.tommorow= tommorow;

  days[indexY] = yesterday;
  days[indexT] = tommorow;

  return{
    type:"NAVIGATE_DAY",
    payload:payload
  }
}


export function reducer(state = days, action = {}) {
  let{payload} = action;
  switch (action.type) {
    case 'UPDATE_DAY':
    let{day,index,currentIndex} = payload;
    return{
      ...state,
      [index] : day,
      currentIndex: currentIndex,
    }
   case 'INITIALIZEDAYS':
    return{
      ...state,
      payload
    }
  case 'UPDATE_PREVIEW_DAY':
  return {
    ...state,
    previewDay: {day:payload.day}
  }
    default :
      return state;
  }
}
