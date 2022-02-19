import {recoveryPasswordReducer} from './recovery-password';
import * as actions from '../actions/recovery-password';
import * as types from '../constants/recovery-password';

const initialState = {
    recoveryPassword: {},
    recoveryPasswordRequest: false, 
    recoveryPasswordFailed: false, 
  };

  describe('recovery password reducer', () => {
    it('should return the initial state', () => {
        expect(recoveryPasswordReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the RECOVERY_PASSWORD_REQUEST', () => {
        expect(
            recoveryPasswordReducer(initialState as any, {
              type: types.RECOVERY_PASSWORD_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            recoveryPasswordRequest: true
        }))
      })

      it('should return the RECOVERY_PASSWORD_SUCCESS', () => {
        const action = actions.RecoveryPasswordSuccessAction({message: 'string',success: true});
        expect(action).toEqual({
            type: types.RECOVERY_PASSWORD_SUCCESS,
            recoveryPassword: {message: 'string',success: true}
        })
      })

      it('should return the GET_PROFILE_ORDERLIST_FAILED', () => {
        expect(
            recoveryPasswordReducer(initialState as any, {
            type: types.RECOVERY_PASSWORD_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            recoveryPasswordFailed: true
        }))
      })
  })