const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const redisClient = require("../../redis/redis");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      redisClient.get(`user:${convoJSON.otherUser.id}`, (err, user) => {
        if (err) console.error(err);
        if (user !== null) {
          convoJSON.otherUser.online = true;
        } else {
          convoJSON.otherUser.online = false;
        }
      });

      // set properties for notification count and latest message preview
      conversations[i] = convoJSON;

      const unreadCount = conversations[i].messages.reduce(
        (accumulator, message) => {
          if (message.senderId !== userId && message.isRead === false)
            return accumulator + 1;
          return accumulator;
        },
        0
      );

      conversations[i].messages.reverse();
      conversations[i].unreadMessageCount = unreadCount;
    }
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/read-status", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { conversationId } = req.body;
    if (!Conversation.verifyUserInConversation(conversationId, senderId))
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
      res.sendStatus(204);
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
