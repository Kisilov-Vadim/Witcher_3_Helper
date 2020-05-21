import {createStore} from 'redux';
import {ACTIONS} from './actions.js'

const initialState = {
  language: 'ru'
}

export const reducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_LANGUAGE: 
      return {
        ...state,
        language: action.lang
      }
    default:
      return state;
  }
}

const store = createStore(reducer, initialState); 

export default store