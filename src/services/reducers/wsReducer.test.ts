import {wsReducer} from './wsReducer';
import * as actions from '../actions/wsAction';
import * as types from '../constants/wsAction';
import {TMessage} from '../types/data';

const initialState = {
    wsConnected: false,
    messages: {}
};

describe('update user reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(initialState as any, {
              type: types.WS_CONNECTION_SUCCESS,
            })
          )
        .toEqual(expect.objectContaining({
            error: undefined,
            wsConnected: true
        }))
    })

    it('should return the WS_CONNECTION_START_PROFILE', () => {
        expect(
            wsReducer(initialState as any, {
              type: types.WS_CONNECTION_START_PROFILE,
            })
          )
        .toEqual(expect.objectContaining({
            error: undefined,
            wsConnected: true
        }))
    })

    it('should return the WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(initialState as any, {
              type: types.WS_CONNECTION_CLOSED,
            })
          )
        .toEqual(expect.objectContaining({
            error: undefined,
            wsConnected: false
        }))
    })

    it('should return the WS_GET_MESSAGE', () => {
        const action = actions.WsGetMessageAction({
            orders: [],
            total: 10,
            totalToday: 10,
        });
        expect(action).toEqual({
            type: types.WS_GET_MESSAGE,
            payload: {
                orders: [],
                total: 10,
                totalToday: 10,
            }
        })
    })

    it('should return the WS_SEND_MESSAGE', () => {
        const action = actions.WsSendMessageAction({} as TMessage);
        expect(action).toEqual({
            type: types.WS_SEND_MESSAGE,
            messages: {}
        })
    })
})