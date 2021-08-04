import React from "react";
import {
  Grid,
  Box,
  Paper,
  SvgIcon,
  Typography,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import formImage from "../../assets/images/formImage.png";
import { ReactComponent as BubbleIcon } from "../../assets/svg/bubble.svg";
const VIEW_BOX = `0 0 67 67`;

const useStyles = makeStyles((theme?: any) => ({
  image: {
    backgroundImage: `url(${formImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.primary.main,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  gradient: {
    background:
      "linear-gradient(to bottom, rgb(58, 141, 255, .85), rgb(134, 185, 255, .85))",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(4),
    color: "#fff",
    textAlign: "center",
  },
  svg: {
    width: 60,
    height: 60,
  },
}));

const FormImage: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid item sm={4} className={`${classes.image}`} component={Paper}>
      <Hidden xsDown>
        <Box className={classes.gradient}>
          <SvgIcon viewBox={VIEW_BOX} fontSize="large" className={classes.svg}>
            <BubbleIcon />
          </SvgIcon>
          <Typography className={classes.text} variant="h5" component="h1">
            Converse with anyone with any language
          </Typography>
        </Box>
      </Hidden>
    </Grid>
  );
};

export default FormImage;
