import { combineReducers } from 'redux'
import {reducer as days} from './main/module'
import {reducer as reminders} from './reminder/module'
import {reducer as events} from './event/module'
export const rootReducer = combineReducers({
  days,
  reminders,
  events
})
