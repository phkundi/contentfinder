import { CREATE_MESSAGE, ADD_CONTENT } from "./types";

function messageReducer(state, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    case ADD_CONTENT:
      console.log(action.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default messageReducer;
