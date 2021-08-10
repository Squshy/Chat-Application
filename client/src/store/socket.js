// ACTIONS

const SET_SOCKET = "SET_SOCKET";

// ACTION CREATORS

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    socket
  };
};

// REDUCER

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;
    default:
      return state;
  }
};

export default reducer;
