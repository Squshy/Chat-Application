import React from "react";
import { Grid, Typography, Button, Theme, Box } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import formImage from '../../assets/images/formImage.png'

interface Props {
  titleText: string;
  buttonText: string;
  alternateButtonText: string;
  alternateButtonOnClick: () => void;
  alternateText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  classes: {
    btnStyles: string;
    btnBoxShadow: string;
  };
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    btnStyles: {
      padding: `${spacing(2)}px ${spacing(6)}px`,
    },
    btnBoxShadow: {
      boxShadow: "0 0 6px 3px #e5e5e5",
    },
  });

const MainForm: React.FC<Props> = ({
  buttonText,
  onSubmit,
  titleText,
  children,
  classes,
  alternateButtonOnClick,
  alternateButtonText,
  alternateText,
}) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={4} style={{backgroundImage: `url(${formImage})`, backgroundSize: 'cover'}}/>
          <Grid item xs={8}>
            <Grid container justifyContent="flex-end" spacing={3} style={{marginTop: 30}}>
              <Grid
                container
                item
                xs={5}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography color="secondary" align="center" variant="inherit">
                  {alternateText}
                </Typography>
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <Button
                  onClick={alternateButtonOnClick}
                  color="primary"
                  size="large"
                  className={`${classes.btnStyles} ${classes.btnBoxShadow}`}
                >
                  {alternateButtonText}
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center" style={{marginBottom: 30}}>
              <Grid item xs={10}>
                <Typography color="initial" variant="h5">
                  {titleText}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={3}>
                    {children}
                    <Grid item container justifyContent="center">
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
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default withStyles(styles)(MainForm);
