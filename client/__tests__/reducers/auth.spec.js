import authReducer from 'reducers/auth';
import { initialAuthState } from 'reducers/initialState';
import { setCurrentUser } from 'actions/auth';


describe('# Auth Reducer', () => {
  it('should return initial state for unknown action types', () => {
    const state = authReducer(undefined);
    expect(state).toEqual(initialAuthState);
    expect(state.user).toEqual({
      group: '',
      userId: 0
    });
    expect(state.user.group).toEqual('');
    expect(state.user.userId).toEqual(0);
    expect(state.isAuthenticated).toEqual(false);
  });
  it('should handle SET_CURRENT_USER action type', () => {
    const userObject = {
      group: 'user',
      userId: 1
    };
    const action = setCurrentUser(userObject);
    const state = authReducer(initialAuthState, action);
    expect(state.user).toEqual(userObject);
    expect(state.user.group).toEqual(userObject.group);
    expect(state.isAuthenticated).toEqual(true);
  });
});
