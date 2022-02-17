import type { Middleware, MiddlewareAPI } from 'redux';
import {TWsActions} from '../types/data';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
   
    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsInitProfile, onOpen, onClose, onError, onMessage } = wsActions;
      const accessToken: string | null = localStorage.getItem("access");

      if(type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`)
      }

      if (type === wsInitProfile) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken!.slice(7)}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};