export const logout = () => {
  return (dispatch) => {
    return fetch("http://localhost:8080/auth/leave", {
      method: "GET",
      credentials: "include"
    }).then(async (res) => {
      const data = await res.json()
      return data
    })
      .then(() => {
        dispatch({ type: "SET_CURRENT_USER", payload: null })
      })
      .catch(err => {
        console.log(err);
      })
  }
}