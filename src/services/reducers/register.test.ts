import {registerReducer} from './register';
import * as actions from '../actions/register';
import * as types from '../constants/register';

const initialState = {
    registerData: {}, 
    registerRequest: false, 
    registerFailed: false, 
};

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(registerReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the REGISTER_REQUEST', () => {
        expect(
            registerReducer(initialState as any, {
              type: types.REGISTER_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            registerRequest: true
        }))
      })

      it('should return the REGISTER_SUCCESS', () => {
        const action = actions.RegisterSuccessAction({
            accessToken: 'string',
            refreshToken: 'string',
            success: true,
            user: {
                email: 'string',
                name: 'string',
            }
        });
        expect(action).toEqual({
            type: types.REGISTER_SUCCESS,
            registerData: {
                accessToken: 'string',
                refreshToken: 'string',
                success: true,
                user: {
                    email: 'string',
                    name: 'string',
                }
            }
        })
      })

      it('should return the REGISTER_FAILED', () => {
        expect(
            registerReducer(initialState as any, {
            type: types.REGISTER_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            registerFailed: true
        }))
      })
})
