import { CREATE_MESSAGE, CLEAR_MESSAGES } from "./types";

function messageReducer(state, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);

    case CLEAR_MESSAGES:
      return {
        show: false,
      };
    default:
      return state;
  }
}
export default messageReducer;
