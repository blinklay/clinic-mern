export const login = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOGINING", payload: true })
    dispatch({ type: "RESET_ERRORS" })

    return fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.login,
        password: data.password
      })
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          dispatch({
            type: "SET_ERRORS", payload: {
              validationErrors: Array.isArray(data) ? data : [],
              status: res.status
            }
          })

          throw new Error(data.message || "Ошибка запроса")
        }

        return data
      })
      .then((data) => {
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: data })
      })
      .catch(err => {
        dispatch({
          type: "SET_ERRORS", payload: {
            msg: err.message
          }
        })
      })
      .finally(() => {
        dispatch({ type: "SET_LOGINING", payload: false })
      })
  }
}