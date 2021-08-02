import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FormHelperText } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { FormField, MainForm } from "./components/UserForm";

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
    <MainForm
      buttonText="Create"
      onSubmit={handleRegister}
      titleText={`Create an account.`}
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
        inputProps={{ minlength: 6 }}
        error={!!formErrorMessage.confirmPassword}
      >
        <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
      </FormField>
      <FormField
        label="Confirm Password"
        ariaLabel="confirm password"
        type="password"
        name="confirmPassword"
        inputProps={{ minlength: 6 }}
        error={!!formErrorMessage.confirmPassword}
      >
        <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
      </FormField>
    </MainForm>
    // <Grid container>
    //   <Grid item xs={5} className={`${styles.imageBox}`} />
    //   <Grid item xs={7}>
    //     <Grid container justifyContent="center" alignItems="center">
    //       {/* Already Have an Account */}
    //       <Grid container justifyContent="flex-end" spacing={4} style={{padding: 3 * 8}}>
    //         <Grid
    //           container
    //           item
    //           xs={7}
    //           md={9}
    //           justify="flex-end"
    //           alignItems="center"
    //         >
    //           <Typography color="secondary" align="center" variant="inherit">
    //             Already have an account?
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={5} md={3}>
    //           <Grid container>
    //             <Button
    //               onClick={() => history.push("/login")}
    //               color="primary"
    //               size="large"
    //               className={`${styles.boxShadow} ${styles.buttonPadding}`}
    //             >
    //               Login
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       {/* Sign up Form */}
    //       <Box p={10} width={1/2}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <Typography color="black" variant="h5">
    //               Create an account.
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <form onSubmit={handleRegister}>
    //               <Grid container spacing={3}>
    //                 <Grid item xs={12}>
    //                   <FormControl fullWidth={true}>
    //                     <FormLabel>Username</FormLabel>
    //                     <TextField
    //                       aria-label="username"
    //                       name="username"
    //                       type="text"
    //                       fullWidth={true}
    //                       margin="dense"
    //                       required
    //                     />
    //                   </FormControl>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <FormControl fullWidth={true}>
    //                     <FormLabel>E-mail address</FormLabel>
    //                     <TextField
    //                       aria-label="e-mail address"
    //                       type="email"
    //                       name="email"
    //                       required
    //                     />
    //                   </FormControl>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <FormControl
    //                     fullWidth={true}
    //                     item
    //                     error={!!formErrorMessage.confirmPassword}
    //                   >
    //                     <FormLabel>Password</FormLabel>
    //                     <TextField
    //                       aria-label="password"
    //                       type="password"
    //                       inputProps={{ minLength: 6 }}
    //                       name="password"
    //                       required
    //                     />
    //                     <FormHelperText>
    //                       {formErrorMessage.confirmPassword}
    //                     </FormHelperText>
    //                   </FormControl>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <div>
    //                     <FormControl
    //                       fullWidth={true}
    //                       item
    //                       error={!!formErrorMessage.confirmPassword}
    //                     >
    //                       <FormLabel>Confirm Password</FormLabel>
    //                       <TextField
    //                         aria-label="confirm password"
    //                         type="password"
    //                         inputProps={{ minLength: 6 }}
    //                         name="confirmPassword"
    //                         required
    //                       />
    //                       <FormHelperText>
    //                         {formErrorMessage.confirmPassword}
    //                       </FormHelperText>
    //                     </FormControl>
    //                   </div>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <Grid container justifyContent="center">
    //                     <Button
    //                       type="submit"
    //                       variant="contained"
    //                       size="large"
    //                       color="primary"
    //                       className={`${styles.buttonPadding}`}
    //                     >
    //                       Create
    //                     </Button>
    //                   </Grid>
    //                 </Grid>
    //               </Grid>
    //             </form>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Grid>
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
