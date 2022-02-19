import {updateTokenReducer} from './update-token';
import * as actions from '../actions/update-token';
import * as types from '../constants/update-token';

const initialState = {
    updateTokenData: {},
    updateTokenRequest: false, 
    updateTokenFailed: false, 
    updateTokenSuccess: false
  };

describe('update token reducer', () => {
    it('should return the initial state', () => {
        expect(updateTokenReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the UPDATE_TOKEN_REQUEST', () => {
        expect(
            updateTokenReducer(initialState as any, {
              type: types.UPDATE_TOKEN_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            updateTokenRequest: true
        }))
      })

      it('should return the UPDATE_TOKEN_SUCCESS', () => { 
        expect(
            updateTokenReducer(initialState as any, {
            type: types.UPDATE_TOKEN_SUCCESS,
            updateTokenData:  {
              success: true,
              accessToken: 'string',
              refreshToken: 'string',
            }
          })
        )
        .toEqual(expect.objectContaining({
          updateTokenData: {
            success: true,
            accessToken: 'string',
            refreshToken: 'string',
        },
        updateTokenSuccess: true
        }))
      })

      it('should return the UPDATE_TOKEN_FAILED', () => { 
        expect(
            updateTokenReducer(initialState as any, {
            type: types.UPDATE_TOKEN_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            updateTokenFailed: true
        }))
      })
})