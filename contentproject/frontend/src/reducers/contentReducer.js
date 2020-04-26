function contentReducer(state, action) {
  switch (action.type) {
    case ADD_CONTENT:
      console.log(action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
}
export default contentReducer;
