const router = require("express").Router();
const { User } = require("../../db/models");
const { Op } = require("sequelize");
const redisClient = require('../../redis')

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: req.user.id,
        },
      },
    });

    // add online status to each user that is online
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      redisClient.get(`user:${sender.id}`, (err, user) => {
        if (err) console.error(err);
        if (user !== null) {
          userJSON.online = true;
        }
      });
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
