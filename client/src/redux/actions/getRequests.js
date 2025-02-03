export const getRequests = (pageNumber) => {
  return (dispatch) => {
    dispatch({ type: "RESET_ERRORS" })
    dispatch({ type: "SET_IS_LOADING", payload: true })
    return fetch(`http://localhost:8080/request?page=${pageNumber}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          dispatch({
            type: "SET_ERRORS",
            payload: {
              status: res.status
            }
          })

          throw new Error(data.message || "Ошибка запроса!")
        }

        return data
      })
      .then(data => {
        dispatch({ type: "SET_REQUESTS", payload: { ...data } })
      })
      .finally(() => [
        dispatch({ type: "SET_IS_LOADING", payload: false })
      ])
  }
}