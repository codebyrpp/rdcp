import { useState } from "react";
import { ErrorObject } from "ajv";
import { useAjvValidation } from "../../hooks/useAjvValidation";

function useFormValidation(schema?: any) {
  const [errors, setErrors] = useState<ErrorObject[] | null>([]);
  const { validate } = useAjvValidation();

  const validateField = (value: string) => {
    if (!schema) return;
    const result = validate(value, schema);
    if (!result.isValid) {
      setErrors(result.errors);
    } else {
      setErrors(null);
    }
    return result.isValid;
  };

  return { errors, validateField };
}

export default useFormValidation;