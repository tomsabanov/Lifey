import React from 'react'
import {AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import {rootReducer} from './app/reducer'

import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import rootSaga from './app/saga'

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

import {API} from './app/API';
API.initializeDays(store);

import { MenuContext } from 'react-native-popup-menu';

import App from './app/App'
const AppWithStore = () => (
  <Provider store={store}>
    <MenuContext>
      <App />
    </MenuContext>
  </Provider>
)

AppRegistry.registerComponent('Lifey', () => AppWithStore);
