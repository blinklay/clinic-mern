export const checkAuth = () => {
  return (dispatch) => {
    return fetch("http://localhost:8080/auth/me", {
      method: "GET",
      credentials: "include"
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          dispatch({ type: "SET_CURRET_USER", payload: null })
          throw new Error(data.message || "Ошибка запроса!")
        }

        return data
      })
      .then(data => {
        dispatch({ type: "SET_CURRET_USER", payload: data })
      })
      .catch(err => {
        console.log(err);

        dispatch({ type: "SET_CURRET_USER", payload: null })
      })
  }
}