import { useState, useCallback } from 'react';
import Ajv, { ErrorObject, JSONSchemaType } from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv); // Extend Ajv with custom error messages support

type ValidationResult = {
  isValid: boolean;
  errors: ErrorObject[] | null;
};

export function useAjvValidation() {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: null,
  });

  const validate = useCallback((value: any, schema: JSONSchemaType<any>) => {
    const validateFn = ajv.compile(schema);
    const isValid = validateFn(value);

    setValidationResult({
      isValid,
      errors: isValid ? null : validateFn.errors || null,
    });

    return {
      isValid,
      errors: validateFn.errors || null,
    };
  }, []);

  return {
    validationResult,
    validate,
  };
}
