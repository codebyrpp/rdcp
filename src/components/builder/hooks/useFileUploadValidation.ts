import { useState, useEffect } from 'react';
import { fileTypes } from '../fields/fileTypes';

type FileValidationOptions = {
    required?: boolean;
    acceptSpecificTypes?: boolean;
    selectedFileTypes?: string[];
    maxFileSize?: number; // File size in MB
};

type FileValidationResult = {
    file: File | null | any; // For React Native, `File` can be an image object
    isValid: boolean;
    errorMessage: string | null;
    handleFileChange: (file: File | any) => void;
};

export function useFileUploadValidation({
    required = false,
    acceptSpecificTypes = false,
    selectedFileTypes = [],
    maxFileSize = 5, // Default to 5 MB
}: FileValidationOptions): FileValidationResult {
    const [file, setFile] = useState<File | null | any>(undefined);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [touched, setTouched] = useState<boolean>(false);

    const validateFile = (file: File | null | any) => {
        if (required && !file && touched) {
            setIsValid(false);
            setErrorMessage('A file is required.');
            return false;
        }

        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024) // For web, we use `file.size`

            if (acceptSpecificTypes && selectedFileTypes.length > 0) {
                // file mime type
                const fileMimeType = file.type;

                // get the mime types of the selected file types
                const validMimeTypes = fileTypes.filter((fileType) => selectedFileTypes.includes(fileType.id))
                    .map((fileType) => fileType.format.mimeTypes).flat();
                console.log(validMimeTypes);
                if (!validMimeTypes.includes(fileMimeType || '')) {
                    setIsValid(false);
                    setErrorMessage(`Invalid file type. Allowed types: ${selectedFileTypes.join(', ')}`);
                    return false;
                }
            }

            if (fileSizeInMB > maxFileSize) {
                setIsValid(false);
                setErrorMessage(`File is too large. Maximum allowed size is ${maxFileSize} MB.`);
                return false;
            }
        }

        setIsValid(true);
        setErrorMessage(null);
        return true;
    };

    const handleFileChange = (file: File | any) => {
        setTouched(true); // File has been touched
        setFile(file);
        validateFile(file);
    };

    useEffect(() => {
        if (touched) { // Only validate if the user has interacted with the file input
            validateFile(file);
        }
    }, [file, required, acceptSpecificTypes, selectedFileTypes, maxFileSize, touched]);

    return {
        file,
        isValid,
        errorMessage,
        handleFileChange,
    };
}
