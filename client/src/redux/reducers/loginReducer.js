const initialState = {
  errors: {
    validationErrors: [],
    status: null,
    msg: ""
  },
  currentUser: null,
  isLogining: false,
  successMessage: null
}

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRET_USER":
      return {
        ...state,
        currentUser: payload
      }
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
    case "SET_LOGINING":
      return {
        ...state,
        isLogining: payload
      }
    case "SET_ERRORS":
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