const initialState = {
  requests: [],
  errors: {
    msg: "",
    validationsError: [],
    status: null
  },
  successMessage: null,
  isCreating: false
}

export const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "RESET_ERRORS":
      return {
        ...state,
        successMessage: null,
        errors: {
          ...initialState.errors
        }
      }
    case "SET_SUCCESS_MESSAGE":
      return {
        ...state,
        successMessage: payload
      }
    case "SET_IS_CREATEING":
      return {
        ...state,
        isCreating: payload
      }
    case "SET_ERRORS":
      console.log({
        ...state.errors,
        ...payload
      });

      return {
        ...state,
        errors: {
          ...state.errors,
          ...payload
        }
      }
    default:
      return state;
  }
}