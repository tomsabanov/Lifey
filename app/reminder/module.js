export function addReminder(payload) {
  return {
    type:'ADD_REMINDER',
    payload: payload
  }
}
export function editReminder(payload){
  return {
    type:'EDIT_REMINDER',
    payload: payload
  }
}
export function deleteReminder(payload){
  return{
    type:'DELETE_REMINDER',
    payload:payload,
  }
}
export function completeReminder(payload){
  return{
    type:'COMPLETE_REMINDER',
    payload:payload
  }
}
const reminders = {
  0:{id:0,reminders:[]},
  1:{id:1,reminders:[]},
  2:{id:2,reminders:[]}
}
export function reducer(state = reminders, action = {}) {
  let{payload} = action;
  switch (action.type) {
    case 'UPDATE_REMINDERS':
    let{reminders} = payload;
    let index0  = payload.index;
    return{
      ...state,
      [index0] : {
        id:index0,
        reminders:reminders
      }
    }
    case 'ADDREMINDER':
    let{about,time,recordings,index,date,id} = payload;
    let reminder = {about,time,recordings,date, completed : false,id};
    return Object.assign({}, state, {
        [index]: {...state[index], reminders:state[index].reminders.concat([reminder])}
    })
    case 'EDITREMINDER':
    let about1 = payload.about;
    let time1 = payload.time;
    let recordings1 =payload.recordings;
    let index2 = payload.index;
    let date1= payload.date;
    let i1 = payload.i;


    let reminder1 = {about:about1,time:time1,recordings:recordings1,date:date1, completed : false};
    let array1 =state[index2].reminders.slice();
    array1[i1] = reminder1;
    return{
      ...state,
      [index2]  : {
        ...state[index2],
        reminders: array1
      }
    }
  case 'COMPLETEREMINDER':
    let index3 = payload.index;
    let reminders2 = state[index3].reminders;
    let i2 = payload.i;
    reminders2[i2].completed = true;
    return {
      ...state,
      [index3]:{
        ...state[index3],
        reminders:reminders2
      }
    }

    case 'DELETEREMINDER':
    let {i} = payload;
    let index1 = payload.index;
    let array = state[index1].reminders.slice();
    array.splice(i,1);
    return Object.assign({}, state, {
        [index1]: {...state[index1], reminders:array}
    })
    case 'INITIALIZEREMINDERS':
    return{
      ...state,
      [0]:{
        id:0,
        reminders:(payload[0]) ? payload[0].reminders : [],
      },
      [1]:{
        id:1,
        reminders:(payload[1]) ? payload[1].reminders : [],
      },
      [2]:{
        id:2,
        reminders:(payload[2]) ? payload[2].reminders : [],
      }
    }
    default :
      return state;
  }
}
