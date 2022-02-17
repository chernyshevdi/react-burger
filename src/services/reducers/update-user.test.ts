import {updateUserReducer} from './update-user';
import * as actions from '../actions/update-user';
import * as types from '../constants/update-user';

const initialState = {
    updateUser: {}, 
    updateUserRequest: false, 
    updateUserFailed: false, 
    updatestatus: {},
};

describe('update user reducer', () => {
    it('should return the initial state', () => {
        expect(updateUserReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the UPDATE_USER_REQUEST', () => {
        expect(
            updateUserReducer(initialState as any, {
              type: types.UPDATE_USER_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            updateUserRequest: true
        }))
    })

    it('should return the UPDATE_USER_SUCCESS', () => {
        const action = actions.UpdateUserSuccessAction({
            success: true,
            user: {
                email: 'string',
                name: 'string',
            }
        });
        expect(action).toEqual({
            type: types.UPDATE_USER_SUCCESS,
            updateUser: {
                success: true,
                user: {
                    email: 'string',
                    name: 'string',
                }
            }
        })
    })

    it('should return UPDATE_USER_FAILED', () => {
        expect(
            updateUserReducer(initialState as any, {
              type: types.UPDATE_USER_FAILED,
              updatestatus: {
                message: 'string',
                success: true
            }
            })
          )
        .toEqual(expect.objectContaining({
            updateUserRequest: false,
            updateUserFailed: true,
            updatestatus: {
                message: 'string',
                success: true
            }
        }))
    })

})