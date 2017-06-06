import React, { Component } from 'react'
import {Navigator} from 'react-native'

import Main from './main/Main'
import Reminder from './reminder/Reminder'
import Event from './event/Event'

import buildStyleInterpolator from 'buildStyleInterpolator';
let SCREEN_WIDTH = require('Dimensions').get('window').width;
let BaseConfig = Navigator.SceneConfigs.FloatFromBottom;
let NoTransition = {
    opacity: {
        value: 1,
        type: 'constant',
    }
};
let CustomSceneConfig = Object.assign({}, BaseConfig, {
    gestures: null,
    defaultTransitionVelocity: 30,
    /*animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition),
    },*/
});
export default class App extends Component {
   _renderScene(route, navigator) {
     switch(route.name){
       case "Main": return <Main  navigator={navigator}/>;
       case "Reminder": return <Reminder navigator={navigator} payload={route.payload}/>;
      case "Event": return <Event navigator={navigator} payload={route.payload}/>;
     }
  }
  _configureScene(route) {
    return CustomSceneConfig;
  }
  render() {
    return (
          <Navigator
          initialRoute={{name:"Main", }}
          renderScene={this._renderScene}
          configureScene={this._configureScene}
          />
    );
   }
}
