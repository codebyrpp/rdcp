import { BaseFieldValidation } from "../base";
import { FileUploadValidation } from "./FileUploadValidation";


export type FileFieldValidationType = "file";

export type FileFieldValidationInstance = {
    type: FileFieldValidationType;
    schema: unknown;
};

export type FileFieldValidation = BaseFieldValidation<FileFieldValidationInstance> & {
    type: FileFieldValidationType;
};

export const FileValidations = {
    file: FileUploadValidation
}; 
