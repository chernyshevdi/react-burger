import {orderListReducer} from './order-list';
import * as actions from '../actions/order-list';
import * as types from '../constants/order-list';

const initialState = {
    orderList: {}, 
    orderListRequest: false, 
    orderListFailed: false, 
};

describe('order list password reducer', () => {
    it('should return the initial state', () => {
        expect(orderListReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the GET_ORDERLIST_REQUEST', () => {
        expect(
            orderListReducer(initialState as any, {
              type: types.GET_ORDERLIST_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            orderListRequest: true
        }))
      })

      it('should return the GET_ORDERLIST_SUCCESS', () => {
        const action = actions.GetOrderListSuccesAction({
            success: true,
            orders: [ {
                ingredients: [],
                _id: 'string',
                status: 'string',
                number: 10,
                createdAt: 'string',
                updatedAt: 'string',
              }],
            total: 10,
            totalToday: 10,
            });
        expect(action).toEqual({
          type: types.GET_ORDERLIST_SUCCESS,
          orderList: {
            success: true,
            orders: [ {
                ingredients: [],
                _id: 'string',
                status: 'string',
                number: 10,
                createdAt: 'string',
                updatedAt: 'string',
              }],
            total: 10,
            totalToday: 10,
          }
        })
      })

      it('should return the GET_ORDERLIST_FAILED', () => {
        expect(
            orderListReducer(initialState as any, {
            type: types.GET_ORDERLIST_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
            orderListFailed: true
        }))
      })
})