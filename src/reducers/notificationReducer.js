export const showMessage = message => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'CHANGE',
        message: null
      })
    }, 5000)
    dispatch({
      type: 'CHANGE',
      message
    })
  }
}

const notificationReducer = ( state = null , action) => {
  switch (action.type) {
  case 'CHANGE':
    return action.message
  default:
    return state
  }
}

export default notificationReducer