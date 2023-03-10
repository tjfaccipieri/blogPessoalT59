import {Action} from './action'

export interface TokenState {
  token: string
}

const initialState = {
  token: ''
}

export const tokenReducer = (state: TokenState = initialState, action: Action) => {
  switch(action.type){
    case "ADD_TOKEN": {
      return{token: action.payload}
    }

    default: return state
  }
}