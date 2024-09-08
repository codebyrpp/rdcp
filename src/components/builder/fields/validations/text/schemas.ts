export type TextFieldValidationType = "regex";

const emailSchema = {
    "type": "string",
    "format": "email",
    "errorMessage": {
        "type": "Email must be a string",
        "format": "Email is not valid"
    }
};

const phoneNumberSchema = {
    "type": "string",
    "pattern": "^[+]?[0-9]{1,4}?[-.\\s]?([0-9]{1,3})?[-.\\s]?([0-9]{1,4})[-.\\s]?([0-9]{1,9})$",
    "errorMessage": {
        "type": "Phone number must be a string",
        "pattern": "Phone number format is invalid"
    }
};

const lengthSchema = {
    "type": "string",
    "minLength": 1,
    "maxLength": 50,
    "errorMessage": {
        "type": "Length must be a string",
        "minLength": "Length is too short",
        "maxLength": "Length is too long"
    }
};

const regexSchema = {
    "type": "string",
    "pattern": "",
    "errorMessage": {
        "type": "Regex must be a string",
        "pattern": "Regex is invalid"
    }
};

export type TextFieldValidationSchema = typeof emailSchema | typeof phoneNumberSchema | typeof lengthSchema | typeof regexSchema;

export const textValidations = {
    email: {
        name: "Email",
        schema: emailSchema
    },
    phoneNumber: {
        name: "Phone Number",
        schema: phoneNumberSchema
    },
    length: {
        name: "Length",
        schema: lengthSchema
    },
    regex: {
        name: "Regex",
        schema: regexSchema
    }
};

export type TextFieldValidationInstance = {
    type: TextFieldValidationType;
    schema: TextFieldValidationSchema;
};

export type TextFieldValidation = {
    type: TextFieldValidationType;
    schema: TextFieldValidationSchema;
    propertiesComponent: React.FC<{
        validationInstance: TextFieldValidationInstance;
    }>;
};




