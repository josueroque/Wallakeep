import * as types from '../types';
import users   from '../reducers/userReducer';
console.log(users);
//console.log(user);
it('should handle a SAVE_USER_SUCCESS action',()=>{
    const initialState=[{user:{}}];
    const action={
        type:types.SAVE_USER_SUCCESS,
        payload:{name:'Josué',surname:'Roque',tag:'mobile'}
    };
    const expectedState={"error": false, "user": {"name": "Josué", "surname": "Roque", "tag": "mobile"}};
    
    expect(users(initialState,action)).toEqual(expectedState);
});
// it('should handle START_GET_TAGS', () => {
//     const startAction = {
//       type: types.START_GET_TAGS
//     };
//     // it's empty on purpose because it's just starting to fetch posts
//     expect(reducers({}, startAction)).toEqual({});
  
// });