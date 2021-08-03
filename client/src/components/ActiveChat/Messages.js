import React, {useEffect,useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
    height: 0
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  const [sortedMessages, setSortedMessages] = useState([]);

  useEffect(() => {
    const sorted = messages.sort((a, b) =>
    moment(a.createdAt).unix() - moment(b.createdAt).unix())
    setSortedMessages(sorted)
  }, [messages])

  return (
    <Box className={classes.root}>
      {sortedMessages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
