import {profileOrderListReducer} from './profile-order-list';
import * as actions from '../actions/profile-order-list';
import * as types from '../constants/profile-order-list';

const initialState = {
    profileOrderList: {}, 
    profileOrderRequest: false, 
    profileOrderFailed: false, 
};

describe('profile order list password reducer', () => {
    it('should return the initial state', () => {
        expect(profileOrderListReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the GET_ORDERLIST_REQUEST', () => {
        expect(
            profileOrderListReducer(initialState as any, {
              type: types.GET_PROFILE_ORDERLIST_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            profileOrderRequest: true
        }))
      })

      it('should return the GET_PROFILE_ORDERLIST_SUCCESS', () => {
        const action = actions.GetProfileOrderListSuccesAction({});
        expect(action).toEqual({
          type: types.GET_PROFILE_ORDERLIST_SUCCESS,
          profileOrderList: {}
        })
      })

      it('should return the GET_PROFILE_ORDERLIST_FAILED', () => {
        expect(
            profileOrderListReducer(initialState as any, {
            type: types.GET_PROFILE_ORDERLIST_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            profileOrderFailed: true
        }))
      })
})