function contentReducer(state, action) {
  switch (action.type) {
    case ADD_CONTENT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
export default contentReducer;
