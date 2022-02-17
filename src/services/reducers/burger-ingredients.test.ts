import {ingredientsReducer} from './burger-ingredients'; 
import * as actions from '../actions/burger-ingredients';
import * as types from '../constants/burger-ingredients';

const initialState = {
    ingredients: [], 
    ingredientsRequest: false,
    ingredientsFailed: false, 
  };

  describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should return the GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(initialState as any, {
              type: types.GET_INGREDIENTS_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            ingredientsRequest: true
        }))
      })

      it('should return the GET_INGREDIENTS_SUCCESS', () => {
        const action = actions.GetIngredientsSuccesAction([]);
        expect(action).toEqual({
          type: types.GET_INGREDIENTS_SUCCESS,
          ingredients: []
        })
      })

      it('should return the GET_INGREDIENTS_FAILED', () => {
        expect(
          ingredientsReducer(initialState as any, {
            type: types.GET_INGREDIENTS_FAILED,
          })
        )
        .toEqual(expect.objectContaining({
          ingredientsFailed: true
        }))
      })
  })