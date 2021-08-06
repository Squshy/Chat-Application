const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.verifyUserInConversation = async (conversationId, userId) => {
  let conversation = await Conversation.findByPk(conversationId);
  // if the user is apart of the conversation send the message
  return conversation.user1Id === userId || conversation.user2Id === userId;
};

module.exports = Conversation;
