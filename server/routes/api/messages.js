const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

const verifyUserInConversation = async (conversationId, userId) => {
  let conversation = await Conversation.findConversationById(conversationId);
  // if the user is apart of the conversation send the message
  return conversation.user1Id === userId || conversation.user2Id === userId;
};

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    if (conversationId) {
      const isUserInConvo = verifyUserInConversation(conversationId, senderId);
      // if the user is apart of the conversation send the message
      if (isUserInConvo) {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
          isRead: false,
        });
        return res.json({ message, sender });
      } else {
        return res.sendStatus(403);
      }
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isRead: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { conversationId } = req.body;
    if (!verifyUserInConversation(conversationId, senderId))
      return res.sendStatus(403);

    if (conversationId) {
      await Message.update(
        {
          isRead: true,
        },
        {
          where: {
            conversationId: {
              [Op.eq]: conversationId,
            },
            senderId: {
              [Op.not]: senderId,
            },
          },
        }
      );
      res.sendStatus(200);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
