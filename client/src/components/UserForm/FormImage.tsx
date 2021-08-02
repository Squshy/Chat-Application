import React from "react";
import {
  Grid,
  Theme,
  Paper,
  SvgIcon,
  Typography,
  Hidden,
} from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import formImage from "../../assets/images/formImage.png";
import { Bubble } from "../../assets/svg/";

interface Props {
  classes: {
    image: string;
    gradient: string;
    text: string;
  };
}

const VIEW_BOX = `0 0 67 67`;

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    image: {
      backgroundImage: `url(${formImage})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: palette.primary.main,
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
      padding: spacing(2),
    },
    text: {
      marginTop: spacing(4),
      color: "#fff",
      textAlign: "center",
    },
  });

const FormImage: React.FC<Props> = ({ classes }) => {
  return (
    <Grid item md={4} className={`${classes.image}`} component={Paper}>
      <Hidden smDown>
        <div className={classes.gradient}>
          <SvgIcon
            viewBox={VIEW_BOX}
            fontSize="large"
            style={{ width: 60, height: 60 }}
          >
            <Bubble viewBox={VIEW_BOX} />
          </SvgIcon>
          <Typography className={classes.text} variant="h5" component="h1">
            Converse with anyone with any language
          </Typography>
        </div>
      </Hidden>
    </Grid>
  );
};

export default withStyles(styles)(FormImage);
