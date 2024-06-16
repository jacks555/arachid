import { combineReducers } from "redux";
import headerReducer from './Header'

const rootReducer = combineReducers({
   header:headerReducer
})

export default rootReducer ; 