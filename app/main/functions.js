import days from './module'

function getDay(id,moment){
  return{
    id:id,
    momentObj:moment,
    toString:getDayToString(moment),
    date:getDayDate(moment)
  }
}

function getDayToString(moment){
  const days = ['Nedelja','Ponedeljek','Torek','Sreda','Četrtek','Petek','Sobota'];
  return days[moment.day()] + ", " + getDayDate(moment) ;
}
function getDayDate(moment){
  const day_date=moment.date();
  const month_date=moment.month() +1;
  const year_date=moment.year();
  return day_date + "." + month_date+"." + year_date;
}
function getIndexRight(index){
  if(index==2){index=0;}
  else{++index;}
  return index;
}
function getIndexLeft(index){
  if(index==0){index=2;}
  else{--index;}
  return index;
}
function newDay(stateDay, add){
  let day = Object.assign({}, stateDay)
  day.momentObj.add(add, 'days');
  day.toString=getDayToString(day.momentObj),
  day.date = getDayDate(day.momentObj)
  return day;
}

export default functions = {
  getDay,
  getIndexRight,
  getIndexLeft,
  newDay,
  getDayToString,
  getDayDate,
  getReminders,
  getDays
}


export function getReminders(docs){
  if(docs.length<1){return;}
  if(docs.length == 1){
    return{
      1:newReminderObject(1, docs[0].reminders)
    }
  }
  if(docs.length == 2){
    return{
      0:newReminderObject(0, docs[0].reminders),
      1:newReminderObject(1, docs[1].reminders)
    }
  }
  return{
    0:newReminderObject(0, docs[0].reminders),
    1:newReminderObject(1, docs[1].reminders),
    2:newReminderObject(2, docs[2].reminders)
  }
}
function newReminderObject(id, reminders){
  return{
    id:id,
    reminders:reminders
  }
}

export function getDays(docs,index){
  return getDay(index,days[index].momentObj)
}
