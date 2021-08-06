import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: "column",
    overflow: "auto",
    height: 0,
  },
  bubbleHolder: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  userBubble: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const [othersLastSeenMessage, setOthersLastSeenMessage] = useState(null);

  // find other user's last seen message
  useEffect(() => {
    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      // skip their messages
      if (currentMessage.senderId === otherUser.id) continue;
      if (currentMessage.isRead === true)
        setOthersLastSeenMessage(currentMessage);
    }
  }, [setOthersLastSeenMessage, othersLastSeenMessage, messages, otherUser]);

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        if (message.senderId === userId) {
          return (
            <Box key={message.id} className={classes.bubbleHolder}>
              <SenderBubble text={message.text} time={time} />
              {othersLastSeenMessage === message && (
                <Avatar
                  alt={`${otherUser.username}`}
                  src={`${otherUser.photoUrl}`}
                  className={classes.userBubble}
                ></Avatar>
              )}
            </Box>
          );
        } else {
          return (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        }
      })}
    </Box>
  );
};

export default Messages;
