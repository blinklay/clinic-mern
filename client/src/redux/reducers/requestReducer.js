const initialState = {
  requests: [],
  errors: [],
  isCreating: false
}

export const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_IS_CREATEING":
      return {
        ...state,
        isCreating: payload
      }
    case "SET_ERRORS":
      return {
        ...state,
        errors: payload
      }
    default:
      return state;
  }
}