import { FormControl, FormLabel, Grid, TextField } from "@material-ui/core";
import React from "react";

interface Props {
  label: string;
  ariaLabel: string;
  name: string;
  type: string;
  error?: boolean;
  inputProps?: { minLength: number };
}

const FormField: React.FC<Props> = ({
  label,
  ariaLabel,
  name,
  type,
  error,
  inputProps,
  children,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth={true} error={error && error}>
          <FormLabel>{label}</FormLabel>
          <TextField
            aria-label={ariaLabel}
            name={name}
            type={type}
            fullWidth={true}
            margin="dense"
            inputProps={inputProps && inputProps}
          />
          {children}
        </FormControl>
      </Grid>
    </>
  );
};

export default FormField;
