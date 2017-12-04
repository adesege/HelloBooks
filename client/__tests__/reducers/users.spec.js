import userReducer from '../../src/reducers/users';
import { usersFetched } from '../../src/actions/users';


describe('# Users Reducer', () => {
  it('should return initial state for unknown action types', () => {
    const state = userReducer(undefined);
    expect(state).toEqual([]);
  });

  it('should handle GET_USERS action type', () => {
    const userObject = {
      result: [{
        id: 1,
        name: 'Testing testing'
      }]
    };
    const action = usersFetched(userObject.result);
    const state = userReducer(userObject, action);
    expect(state).toEqual(userObject.result);
  });
});
