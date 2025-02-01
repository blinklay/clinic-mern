export const createRequest = () => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_CREATEING", payload: true })
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('foo')
      }, 1000);
    }).finally(() => {
      dispatch({ type: "SET_IS_CREATEING", payload: false })
    })
  }
}