import {appReducer} from './app'; 
import * as actions from '../actions/app';
import * as types from '../constants/app';
import {TIngredient, TOrders} from '../types/data';

export const initialState = {
  currentIngredient: {},  
  currentOrder: {}
};

describe('app reducer', () => {

    it('should return the initial state', () => {
      expect(appReducer(undefined, {} as any)).toEqual(initialState);
    });
  
    it('should return the ADD_MODAL_DATA', () => {
      const action = actions.AddModalDataAction({calories: 12} as TIngredient);
      expect(action).toEqual({
        type: types.ADD_MODAL_DATA,
        item: {calories: 12}
      })
    })

    it('should return the ADD_MODAL_PROFILE', () => {
      const action = actions.AddModalProfileAction({number: 10} as TOrders);
      expect(action).toEqual({
        type: types.ADD_MODAL_PROFILE,
        order: {number: 10}
      })
    })

    it('should return the DELETE_MODAL_DATA', () => {
      expect(appReducer(undefined, {
        type: types.DELETE_MODAL_DATA
      })).toEqual({      
       ...initialState,
      })
    })
})

