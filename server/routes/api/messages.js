const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    if (conversationId) {
      let conversation = await Conversation.findConversationById(
        conversationId
      );
      // if the user is apart of the conversation send the message
      if (
        conversation.user1Id === senderId ||
        conversation.user2Id === senderId
      ) {
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

router.post("/clearReadMessages", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    console.log("we in here");
    const senderId = req.user.id;
    const { conversationId } = req.body;

    if (conversationId) {
      const updatedMessages = await Message.update(
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
      ).then(res => {
        console.log("It half worked?:", res)
      }).catch(err => console.log(err));
      console.log("updatedMessages:", updatedMessages)
      res.json({ updatedMessages });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
