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
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import bgImage from "./assets/images/bg-img.png";
import { withStyles } from "@material-ui/core/styles";

const LoginButton = withStyles({
  root: {
    boxShadow: "0 0 10px 2px #e5e5e5",
    height: "100%",
    width: "100%",
    padding: 15,
  },
})((props) => <Button {...props} />);

const Login = (props) => {
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
      <Grid item xs={5}>
        <Box width={1} height={1}>
          <img
            src={bgImage}
            alt={`Group of friends laughing, holding coffee looking at their phones.`}
            width={"100%"}
            height={`100%`}
          />
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Box sx={{ p: 5 }}>
          <Grid container item justify="flex-end" spacing={4}>
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
              <LoginButton
                onClick={() => history.push("/login")}
                color="primary"
                size="large"
              >
                Login
              </LoginButton>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      aria-label="password"
                      label="Password"
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
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      label="Confirm Password"
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
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  classes={null}
                >
                  Create
                </Button>
              </Grid>
            </form>
          </Grid>
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
