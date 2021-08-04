import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/utils/thunkCreators";
import { FormField, MainForm } from "../components/UserForm";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <MainForm
        buttonText="Login"
        onSubmit={handleLogin}
        titleText="Welcome back!"
        alternateButtonText="Create account"
        alternateRegistrationText="Don't have an account?"
        alternateButtonOnClick={() => history.push("/register")}
      >
        <FormField label="Username" ariaLabel="username" name="username" type="text"/>
        <FormField label="Password" ariaLabel="password" type="password" name="password"/>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
