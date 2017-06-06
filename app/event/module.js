export function addEvent(payload) {
  return {
    type:'ADD_EVENT',
    payload: payload
  }
}
export function editEvent(payload){
  return {
    type:'EDIT_EVENT',
    payload: payload
  }
}
export function deleteEvent(payload){
  return{
    type:'DELETE_EVENT',
    payload:payload,
  }
}

const events = {
  0:{id:0,events:[]},
  1:{id:1,events:[]},
  2:{id:2,events:[]}
}
export function reducer(state = events, action = {}) {
  let{payload} = action;
  switch (action.type) {
    case 'UPDATE_EVENTS':
    let{reminders} = payload;
    let index0  = payload.index;
    return{
      ...state,
      [index0] : {
        id:index0,
        events:reminders
      }
    }
    case 'ADDEVENT':
    let{about,from,to,alarm,recordings,index,date,id} = payload;
    let reminder = {about,from,to,recordings,date,id, alarm};
    return Object.assign({}, state, {
        [index]: {...state[index], events:state[index].events.concat([reminder])}
    })
    case 'EDITEVENT':
    let about1 = payload.about;
    let from1 = payload.from;
    let to1 = payload.to;
    let recordings1 =payload.recordings;
    let index2 = payload.index;
    let date1= payload.date;
    let i1 = payload.i;
    let alarm1 = payload.alarm;

    let reminder1 = {alarm:alarm1,about:about1,from:from1,to:to1,recordings:recordings1,date:date1};
    let array1 =state[index2].events.slice();
    array1[i1] = reminder1;
    return{
      ...state,
      [index2]  : {
        ...state[index2],
        events: array1
      }
    }
    case 'DELETEEVENT':
    let {i} = payload;
    let index1 = payload.index;
    let array = state[index1].events.slice();
    array.splice(i,1);
    return Object.assign({}, state, {
        [index1]: {...state[index1], events:array}
    })
    case 'INITIALIZEEVENTS':
    return{
      ...state,
      [0]:{
        id:0,
        events:(payload[0]) ? payload[0].events : [],
      },
      [1]:{
        id:1,
        events:(payload[1]) ? payload[1].events : [],
      },
      [2]:{
        id:2,
        events:(payload[2]) ? payload[2].events : [],
      }
    }
    default :
      return state;
  }
}
