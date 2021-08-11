import axios from "axios";
import { io } from "socket.io-client";
import { clearOnLogout } from "..";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  setReadMessages,
  addOnlineUser,
  removeOfflineUser,
} from "../conversations";
import { setSocket } from "../socket";
import { gotUser, setFetchingStatus } from "../user";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch, getState) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      const token = await localStorage.getItem("messenger-token");
      await createSocketConnection(token, dispatch);
      const { socket } = getState();
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    await createSocketConnection(data.token, dispatch);
    const { socket } = getState();
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    await createSocketConnection(data.token, dispatch);
    const { socket } = getState();
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/auth/logout");
    const { socket } = getState();
    socket.emit("logout", id);
    clearSocketConnection(socket, dispatch)
    await localStorage.removeItem("messenger-token");
    dispatch(gotUser({}));
    dispatch(clearOnLogout())
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body, socket) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch, getState) => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message, data.sender));
    }
    const { socket } = getState();

    sendMessage(data, body, socket);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const clearReadMessages = (body) => async (dispatch, getState) => {
  try {
    await axios.put(
      `/api/conversations/${body.conversationId}/read-status`,
      body
    );
    const { user } = getState();
    dispatch(setReadMessages(body.conversationId, user));
  } catch (error) {
    console.log(error);
  }
};

// SOCKET THUNK CREATORS
const createSocketConnection = (token, dispatch) => {
  try {
    const newSocket = io(window.location.origin, {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    newSocket.on("connect", () => {
      console.log(`connected to server`);

      newSocket.on("add-online-user", (id) => {
        dispatch(addOnlineUser(id));
      });

      newSocket.on("remove-offline-user", (id) => {
        dispatch(removeOfflineUser(id));
      });

      newSocket.on("new-message", (data) => {
        dispatch(setNewMessage(data.message, data.sender));
      });
    });
    dispatch(setSocket(newSocket));
  } catch (error) {
    console.error(error);
  }
};

const clearSocketConnection = (socket, dispatch) => {
  socket.close()
  dispatch(setSocket({}))
}