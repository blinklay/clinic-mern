export const createRequest = (formData) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_CREATEING", payload: true })
    return fetch("http://localhost:8080/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          dispatch({
            type: "SET_ERRORS", payload: {
              validationsError: Array.isArray(data) ? data : [],
              status: res.status
            }
          })
          throw new Error(data.message || "Ошибка запроса");
        }

        return data
      })
      .then(data => {
        dispatch({
          type: "SET_SUCCESS_MESSAGE", payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: "SET_ERRORS", payload: {
            msg: err.message
          }
        })
      })
      .finally(() => {
        dispatch({ type: "SET_IS_CREATEING", payload: false })
      })
  }
}