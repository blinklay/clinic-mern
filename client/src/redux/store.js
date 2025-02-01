import { applyMiddleware, combineReducers, createStore } from 'redux'
import { requestReducer } from './reducers/requestReducer'
import { thunk } from "redux-thunk"

const reducer = combineReducers({
  requests: requestReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))