import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    flexDirection: "column",
    overflow: "auto",
    height: 0,
  },
});

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const [othersLastSeenMessage, setOthersLastSeenMessage] = useState(null);

  // find other user's last seen message
  useEffect(() => {
    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      console.log("Checking message:", currentMessage);
      // skip their messages
      if (currentMessage.senderId === otherUser.id) continue;
      if (currentMessage.isRead === true)
        setOthersLastSeenMessage(currentMessage);
    }
    console.log("Last seen message:", othersLastSeenMessage);
    console.log("Messages:", messages);
    console.log("Other User:", otherUser)
  }, [setOthersLastSeenMessage, othersLastSeenMessage, messages, otherUser]);

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        if (message.senderId === userId) {
          return (
            <>
              <SenderBubble key={message.id} text={message.text} time={time} />
              {othersLastSeenMessage === message && <p>LAST SEEN MESSAGE</p>}
            </>
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
