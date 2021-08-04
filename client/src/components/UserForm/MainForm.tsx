import React from "react";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormImage } from ".";

interface Props {
  titleText: string;
  buttonText: string;
  alternateButtonText: string;
  alternateButtonOnClick: () => void;
  alternateRegistrationText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: "100vh",
  },

  alternate: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    margin: theme.spacing(4, 4),
  },
  titleWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  formContainer: {
    margin: theme.spacing(8, 12),
    display: "flex",
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  form: {
    width: "100%",
  },
  item: {
    margin: theme.spacing(1),
  },
  btnStyles: {
    padding: theme.spacing(2, 6),
  },
  btnBoxShadow: {
    boxShadow: "0 0 6px 3px #e5e5e5",
  },
  semiBold: {
    fontWeight: 600
  }
}));

const MainForm: React.FC<Props> = ({
  buttonText,
  onSubmit,
  titleText,
  children,
  alternateButtonOnClick,
  alternateButtonText,
  alternateRegistrationText,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container component="main" className={`${classes.root}`}>
        <FormImage />
        <Grid item xs={12} sm={8} component={Paper}>
          <div className={classes.alternate}>
            <Typography
              color="secondary"
              align="center"
              variant="inherit"
              className={classes.item}
            >
              {alternateRegistrationText}
            </Typography>
            <Button
              onClick={alternateButtonOnClick}
              color="primary"
              size="large"
              className={`${classes.btnStyles} ${classes.btnBoxShadow} ${classes.item}`}
            >
              {alternateButtonText}
            </Button>
          </div>
          <div className={classes.formContainer}>
            <div className={classes.titleWrapper}>
              <Typography
                color="initial"
                component="h1"
                variant="h5"
                className={classes.semiBold}
              >
                {titleText}
              </Typography>
            </div>
            <form onSubmit={onSubmit} className={classes.form}>
              {children}
              <div className={classes.btnWrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.btnStyles}
                >
                  {buttonText}
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default MainForm;
