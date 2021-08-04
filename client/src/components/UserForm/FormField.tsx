import { FormControl, TextField } from "@material-ui/core";
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
        <FormControl fullWidth={true} error={error}>
          <TextField
            aria-label={ariaLabel}
            label={label}
            margin="normal"
            name={name}
            type={type}
            fullWidth
            required
            inputProps={inputProps}
          />
          {children}
        </FormControl>
      
    </>
  );
};

export default FormField;
