import { GET_ERRORS, CLEAR_ERRORS } from "./types";

function errorReducer(state, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        show: true,
      };
    case CLEAR_ERRORS:
      return {
        show: false,
        msg: {},
        status: null,
      };

    default:
      return state;
  }
}
export default errorReducer;
