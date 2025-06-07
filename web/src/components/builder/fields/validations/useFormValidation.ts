import { useState } from "react";
import { ErrorObject } from "ajv";
import { useAjvValidation } from "../../hooks/useAjvValidation";
import { set } from "date-fns";

const REQUIRED_MESSAGE = "This field is required";

function useFormValidation(required: boolean) {
  const [errors, setErrors] = useState<(string)[]>([]);
  const { validate } = useAjvValidation();

  const validateFieldFromSchema = (value: string | number, schema: any) => {

    if (requiredValidation(value))
      return false;

    if (!schema) return true; // no need for validation so return true

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

  // validate required field
  // if required is true and value is empty, add required error
  const requiredValidation = (value: string | number | boolean) => {
    if (!value && required) {
      // add required error if not exists
      if (!errors.includes(REQUIRED_MESSAGE)) {
        addError(REQUIRED_MESSAGE);
      }
      // return true and stop validation
      return true;
    }
    // remove required error if exists
    setErrors(errors.filter((error) => error !== REQUIRED_MESSAGE));
    return false;
  }

  return { errors, validateFieldFromSchema, addError, requiredValidation };
}
export default useFormValidation;