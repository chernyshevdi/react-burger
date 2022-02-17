import {loginReducer} from './auth'; 
import * as actions from '../actions/login';
import * as types from '../constants/login';

const initialState = {
  loginData: {}, 
  loginRequest: false, 
  loginFailed: false, 

  logoutData: {}, 
  logoutRequest: false,
  logoutFailed: false, 
  login: false,

  userData: {},
  userRequest: false, 
  userFailed: false, 
  status: {},
};

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should return the LOGIN_REQUEST', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.LOGIN_REQUEST,
        })
      )
    .toEqual(expect.objectContaining({
      loginRequest: true
    }))
  })

it('should return the LOGIN_SUCCESS', () => {
  expect(
    loginReducer(initialState as any, {
        type: types.LOGIN_SUCCESS,
        loginData: {
          accessToken: 'string',
          refreshToken: 'string',
          success: true,
          user: {
            email: 'string',
            name: 'string',
          }
        }
      })
    )
  .toEqual(expect.objectContaining({
    loginData: {
      accessToken: 'string',
      refreshToken: 'string',
      success: true,
      user: {
        email: 'string',
        name: 'string',
      }
    },
    login: true,
  }))
})


  it('should return the LOGIN_FAILED', () => {
    expect(
      loginReducer(initialState as any, {
        type: types.LOGIN_FAILED,
      })
    )
    .toEqual(expect.objectContaining({
      loginFailed: true
    }))
  })

  it('should return the LOGOUT_REQUEST', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.LOGOUT_REQUEST,
        })
      )
    .toEqual(expect.objectContaining({
      logoutRequest: true
    }))
  })

  it('should return the LOGOUT_SUCCESS', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.LOGOUT_SUCCESS,
          logoutData: {
            message: 'string', 
            success: true
          }
        })
      )
    .toEqual(expect.objectContaining({
      logoutData: {
        message: 'string', 
        success: true
      },
      login: false
    }))
  })

  it('should return the LOGOUT_FAILED', () => {
    expect(
      loginReducer(initialState as any, {
        type: types.LOGOUT_FAILED,
      })
    )
    .toEqual(expect.objectContaining({
      logoutFailed: true,
      login: true,
    }))
  })

  it('should return the GET_USER_REQUEST', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.GET_USER_REQUEST,
        })
      )
    .toEqual(expect.objectContaining({
      userRequest: true
    }))
  })

  it('should return the GET_USER_SUCCESS', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.GET_USER_SUCCESS,
          userData: {
            success: true,
            user: {
              email: 'string',
              name: 'string'
            }
          }
        })
      )
    .toEqual(expect.objectContaining({
      userData: {
        success: true,
        user: {
          email: 'string',
          name: 'string'
        }
      },
      login: true,
    }))
  })

  it('should return the GET_USER_FAILED', () => {
    expect(
      loginReducer(initialState as any, {
          type: types.GET_USER_FAILED,
          status: {}
        })
      )
    .toEqual(expect.objectContaining({
      status: {},
      userFailed: true,
    }))
  })
})