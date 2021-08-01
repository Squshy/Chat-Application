import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  FormLabel,
  Paper,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import bgImage from "./assets/images/bg-img.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonPadding: {
    padding: "15px 50px",
  },
  boxShadow: {
    boxShadow: " 0 0 5px 1px #e5e5e5",
  },
});

const Login = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Grid item xs={5} style={{display: 'flex', justifyContent: 'center', alignItems:'center', overflow:'hidden'}}>
          <img
            src={bgImage}
            alt={`Group of friends laughing, holding coffee looking at their phones.`}
            style={{
              minWidth: "100%",
              minHeight: "100%",
              flexShrink: 0
            }}
          />
      </Grid>
      <Grid item xs={7}>
        <Box sx={{ p: 5 }}>
          {/* Already Have an Account */}
          <Grid container item justifyContent="flex-end" spacing={4}>
            <Grid
              container
              item
              xs={7}
              md={9}
              justify="flex-end"
              alignItems="center"
            >
              <Typography color="secondary" align="center" variant="inherit">
                Already have an account?
              </Typography>
            </Grid>
            <Grid item xs={5} md={3}>
              <Grid container>
                <Button
                  onClick={() => history.push("/login")}
                  color="primary"
                  size="large"
                  className={`${styles.boxShadow} ${styles.buttonPadding}`}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Sign up Form */}
          <Box p={10}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography color="black" variant="h5">
                  Create an account.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form onSubmit={handleRegister}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth={true}>
                        <FormLabel>Username</FormLabel>
                        <TextField
                          aria-label="username"
                          name="username"
                          type="text"
                          fullWidth={true}
                          margin="dense"
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth={true}>
                        <FormLabel>E-mail</FormLabel>
                        <TextField
                          aria-label="e-mail address"
                          type="email"
                          name="email"
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth={true}
                        item
                        error={!!formErrorMessage.confirmPassword}
                      >
                        <FormLabel>Password</FormLabel>
                        <TextField
                          aria-label="password"
                          type="password"
                          inputProps={{ minLength: 6 }}
                          name="password"
                          required
                        />
                        <FormHelperText>
                          {formErrorMessage.confirmPassword}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <FormControl
                          fullWidth={true}
                          item
                          error={!!formErrorMessage.confirmPassword}
                        >
                          <FormLabel>Confirm Password</FormLabel>
                          <TextField
                            aria-label="confirm password"
                            type="password"
                            inputProps={{ minLength: 6 }}
                            name="confirmPassword"
                            required
                          />
                          <FormHelperText>
                            {formErrorMessage.confirmPassword}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          color="primary"
                          className={`${styles.buttonPadding}`}
                        >
                          Create
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
