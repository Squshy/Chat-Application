import React from "react";
import { Grid, Typography, Button, Theme } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";

interface Props {
  titleText: string;
  buttonText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  classes: {
    btnStyles: string;
  };
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    btnStyles: {
      padding: `${spacing(2)}px ${spacing(6)}px`,
    },
  });

const MainForm: React.FC<Props> = ({
  buttonText,
  onSubmit,
  titleText,
  children,
  classes,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="initial" variant="h5">
            {titleText}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              {children}
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={classes.btnStyles}
              >
                {buttonText}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(MainForm);
