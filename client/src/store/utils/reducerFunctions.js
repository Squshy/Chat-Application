export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;

  const isNewConvo =
    state.filter((convo) => convo.id === message.conversationId).length === 0;

  if (isNewConvo) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMessageCount: 1,
    };
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);

      if ((sender.id === convoCopy.otherUser.id) & !message.isRead) 
        convoCopy.unreadMessageCount += 1;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessage = message;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const clearConversationsReadMessages = (state, payload) => {
  const { conversationId, user } = payload;
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const updatedConvo = { ...convo };
      updatedConvo.unreadMessageCount = 0;
      for (let i = updatedConvo.messages.length - 1; i > 0; i--) {
        const currentMessage = updatedConvo.messages[i];
        // skip our messages
        if (currentMessage.senderId === user.id) continue;
        if (currentMessage.isRead) break;
        updatedConvo.messages[i].isRead = true;
      }
      return updatedConvo;
    } else return convo;
  });
};