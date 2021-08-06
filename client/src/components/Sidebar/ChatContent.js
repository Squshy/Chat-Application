import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadMessageContainer: {
    dispaly: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  unreadMessages: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(2),
    borderRadius: "75%",
    padding: theme.spacing(0.5, 1.5),
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    height: "2rem",
    width: "2rem",
    lineHeight: "2rem",
    background: theme.palette.primary.main,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000'
  }
}));


const ChatContent = (props) => {
  const classes = useStyles();
  const [isRead, setIsRead] = useState(false);

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessageCount } = conversation;

  useEffect(() => {
    const [lastMessage] = conversation.messages.slice(-1);
    if(!lastMessage.isRead && lastMessage.senderId === otherUser.id) setIsRead(false);
    else setIsRead(true)
  }, [isRead, setIsRead, otherUser, conversation])

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${!isRead && `${classes.boldText}`}`}>
          {latestMessageText}
        </Typography>
      </Box>
      <Box className={classes.unreadMessageContainer}>
        {unreadMessageCount > 0 && (
          <Typography className={classes.unreadMessages}>
            {unreadMessageCount > 100 ? "99+" : unreadMessageCount}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatContent;
