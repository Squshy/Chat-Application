import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FormHelperText } from "@material-ui/core";
import { register } from "../store/utils/thunkCreators";
import { FormField, MainForm } from "../components/UserForm";

const Signup = (props) => {
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
    <>
      <MainForm
        buttonText="Create"
        onSubmit={handleRegister}
        titleText={`Create an account.`}
        alternateButtonText={`Login`}
        alternateRegistrationText={`Already have an account?`}
        alternateButtonOnClick={() => history.push("/login")}
      >
        <FormField
          label="Username"
          ariaLabel="username"
          type="text"
          name="username"
        />
        <FormField
          label="E-mail address"
          ariaLabel="e-mail address"
          type="email"
          name="email"
        />
        <FormField
          label="Password"
          ariaLabel="password"
          type="password"
          name="password"
          inputProps={{ minLength: 6 }}
          error={!!formErrorMessage.confirmPassword}
        >
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormField>
        <FormField
          label="Confirm Password"
          ariaLabel="confirm password"
          type="password"
          name="confirmPassword"
          inputProps={{ minLength: 6 }}
          error={!!formErrorMessage.confirmPassword}
        >
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormField>
      </MainForm>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
