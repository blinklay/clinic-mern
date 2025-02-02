import { applyMiddleware, combineReducers, createStore } from 'redux'
import { requestReducer } from './reducers/requestReducer'
import { thunk } from "redux-thunk"
import { loginReducer } from './reducers/loginReducer'

const reducer = combineReducers({
  requests: requestReducer,
  login: loginReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))