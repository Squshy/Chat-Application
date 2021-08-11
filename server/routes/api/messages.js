const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const redisClient = require('../../redis')

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    if (conversationId) {
      const isUserInConvo = Conversation.verifyUserInConversation(
        conversationId,
        senderId
      );
      // if the user is apart of the conversation send the message
      if (!isUserInConvo) {
        return res.sendStatus(403);
      } else {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
          isRead: false,
        });
        return res.json({ message, sender });
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

      redisClient.get(`user:${sender.id}`, (err, user) => {
        if (err) console.error(err);
        if (user !== null) {
          sender.online = true;
        }
      });
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

module.exports = router;
