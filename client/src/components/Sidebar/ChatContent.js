import React from "react";
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
    background: theme.palette.primary.main
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessageCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <Box className={classes.unreadMessageContainer}>
        <Typography className={classes.unreadMessages}>
          {unreadMessageCount > 100 ? "99+" : unreadMessageCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
