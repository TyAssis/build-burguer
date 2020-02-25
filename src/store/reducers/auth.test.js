import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: '/',
    });
  })

  it('should store idToken upon login', () => {
    expect(reducer({
      idToken: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: '/',
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'someToken',
      userId: 'someUserId',
    }))
    .toEqual({
      idToken: 'someToken',
      userId: 'someUserId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  })

})