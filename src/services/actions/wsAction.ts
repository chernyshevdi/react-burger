import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_START_PROFILE
  } from '../constants/wsAction';
  import {TMessage} from '../types/data';

  export interface IwsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IwsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
  
export interface IwsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
  
export interface IwsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IwsGetMessage{
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: TMessage;
}

export interface IwsSendMessage{
    readonly type: typeof WS_SEND_MESSAGE,
    readonly messages: TMessage;
}


export interface IwsConnectionStartProfile{
    readonly type: typeof WS_CONNECTION_START_PROFILE
}

export type TWSoketActions =
| IwsConnectionSuccess
| IwsConnectionError
| IwsConnectionClosed
| IwsConnectionStart
| IwsGetMessage
| IwsSendMessage
| IwsConnectionStartProfile;

export const wsConnectionStartAction = (): IwsConnectionStart => ({
    type: WS_CONNECTION_START
  });

  export const wsConnectionStartProfileAction = (): IwsConnectionStartProfile => ({
    type: WS_CONNECTION_START_PROFILE
  });

export const wsConnectionSuccessAction = (): IwsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
  });
  
  export const wsConnectionErrorAction = (): IwsConnectionError => ({
    type: WS_CONNECTION_ERROR
  });
  
  export const wsConnectionClosedAction = (): IwsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
  });

  export const WsGetMessageAction = (payload: TMessage): IwsGetMessage => ({
    type: WS_GET_MESSAGE,
    payload
  });

  export const WsSendMessageAction = (messages: TMessage): IwsSendMessage => ({
    type: WS_SEND_MESSAGE,
    messages
  });
