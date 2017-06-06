import {days} from './main/saga'
import {reminders} from './reminder/saga'
import {events} from './event/saga'

export default function* rootSaga() {
  yield [
    days(),
    reminders(),
    events()
  ]
}
