import {TWSoketActions} from "../actions/wsAction";
import {
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
  } from '../constants/wsAction';
  import {TMessage} from '../types/data';

  export type TWsState = {
    wsConnected: boolean;
    messages: TMessage;
    error?: Event;
  }

const initialState = {
    wsConnected: false,
    messages: {} as TMessage
  };
  
  export const wsReducer = (state = initialState, action: TWSoketActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
              ...state,
              error: undefined,
              wsConnected: true,
            }
        }

        case WS_CONNECTION_START_PROFILE: {
            return {
                ...state,
                error: undefined,
                wsConnected: true,
              }
        }

        case WS_CONNECTION_ERROR: {
            return {
            ...state,
            wsConnected: false,
            }
        }

        case WS_CONNECTION_CLOSED: {
            return {
              ...state,
              error: undefined,
              wsConnected: false,
            }
        }

        case WS_GET_MESSAGE: {
            return {
              ...state,
              messages: action.payload
            }
        }

        case WS_SEND_MESSAGE: {
            return {
              ...state,
              messages: {} as TMessage
            }
        }   

        default: {
            return state;
        }
    }}