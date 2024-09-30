import { useState } from "react";
import { ErrorObject } from "ajv";
import { useAjvValidation } from "../../hooks/useAjvValidation";
import { set } from "date-fns";

function useFormValidation(
  required: boolean,
  schema?: any) {
  const [errors, setErrors] = useState<(string)[]>([]);
  const { validate } = useAjvValidation();

  const validateField = (value: string | number) => {

    if (!value && required) {
      // add required error
      setErrors(["This field is required", ...errors]);
      return;
    }
    else {
      setErrors(errors.filter((error) => error !== "This field is required"));
    }

    if (!schema) return;

    const result = validate(value, schema);
    if (!result.isValid) {
      // push defined error messages to errors
      const _errors: string[] = []
      result.errors?.forEach((error) => {
        if (error.message) _errors.push(error.message);
      });
      setErrors(_errors);
    } else {
      setErrors([]);
    }
    return result.isValid;
  };

  const addError = (error: string) => {
    setErrors((prev) => {
      if (!prev) return [error];
      return [...prev, error];
    });
  }

  return { errors, validateField, addError };
}

export default useFormValidation;