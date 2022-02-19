import {constructorReducer} from './burger-constructor'; 
import * as actions from '../actions/burger-constructor';
import * as types from '../constants/burger-constructor';

const initialState = {
    ingredientsInBurgerConstructor: { bun: [], other: [] }, 
    createdOrder: {}, 
    orderRequest: false,
    orderFailed: false, 
  };

  describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual(initialState);
      });

      it('should return the GET_ORDER_REQUEST', () => {
        expect(
            constructorReducer(initialState as any, {
              type: types.GET_ORDER_REQUEST,
            })
          )
        .toEqual(expect.objectContaining({
            orderRequest: true
        }))
      })

      it('should return the GET_ORDER_SUCCESS', () => {
        const action = actions.GetOrderSuccessAction({number: 10});
        expect(action).toEqual({
            type: types.GET_ORDER_SUCCESS,
            createdOrder: {number: 10}
        })
      })

      it('should return the GET_ORDER_FAILED', () => {
        expect(
            constructorReducer(initialState as any, {
              type: types.GET_ORDER_FAILED,
            })
          )
        .toEqual(expect.objectContaining({
            orderFailed: true
        }))
      })

      it('should return the GET_ORDER_CLOSE', () => {
        expect(
            constructorReducer(initialState as any, {
              type: types.GET_ORDER_CLOSE,
            })
          )
        .toEqual(expect.objectContaining({
            orderRequest: false,
            orderFailed: false,
            createdOrder: {}
        }))
      })

      it('should return the ADD_INGREDIENT_BURGERCONSTRUCTOR', () => {
        const action = actions.AddIngredientConstructorAction({
            calories: 12,
            carbohydrates: 12,
            fat: 12,
            image: 'string',
            image_large: 'string',
            image_mobile: 'string',
            name: 'string',
            price: 12,
            proteins: 12,
            type: 'string',
            __v: 12,
            _id: 'string',
        });
        expect(action).toEqual({
            type: types.ADD_INGREDIENT_BURGERCONSTRUCTOR,
            item: {
                calories: 12,
                carbohydrates: 12,
                fat: 12,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
                name: 'string',
                price: 12,
                proteins: 12,
                type: 'string',
                __v: 12,
                _id: 'string',
            }
        })
      })

      it('should return the CHANGE_ORDER_BURGERCONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState as any, {
              type: types.CHANGE_ORDER_BURGERCONSTRUCTOR,
              item: [],
              dragIndex: 10,
              hoverIndex: 10
            })
          )
        .toEqual(expect.objectContaining({
          createdOrder: {}, 
          ingredientsInBurgerConstructor: {
          bun: [], 
          other: [undefined]
          }, 
          orderFailed: false, 
          orderRequest: false
        }))
      })

        it('should return the DELETE_INGREDIENT_BURGERCONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState as any, {
              type: types.DELETE_INGREDIENT_BURGERCONSTRUCTOR,
              id: '10'
            })
          )
        .toEqual(expect.objectContaining(initialState))
      })
    })