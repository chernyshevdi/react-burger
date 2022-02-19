import {forgotPasswordReducer} from './forgot-password';
import * as actions from '../actions/forgot-password';
import * as types from '../constants/forgot-password';

const initialState = {
    forgotPassword: {}, 
    forgotPasswordRequest: false, 
    forgotPasswordFailed: false, 
  };

  describe('forgot password reducer', () => {
    it('should return the initial state', () => {
        expect(forgotPasswordReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the FORGOT_PASSWORD_REQUEST', () => {
        expect(
            forgotPasswordReducer(initialState as any, {
              type: types.FORGOT_PASSWORD_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            forgotPasswordRequest: true
        }))
      })

      it('should return the FORGOT_PASSWORD_SUCCESS', () => {
        const action = actions.ForgotPasswordSuccessAction({ message: 'string', success: true});
        expect(action).toEqual({
          type: types.FORGOT_PASSWORD_SUCCESS,
          forgotPassword: { message: 'string', success: true}
        })
      })

      it('should return the FORGOT_PASSWORD_FAILED', () => {
        expect(
            forgotPasswordReducer(initialState as any, {
            type: types.FORGOT_PASSWORD_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            forgotPasswordFailed: true
        }))
      })
  })