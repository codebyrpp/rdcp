import axiosInstance from '@/state/axiosInstance';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useSubmitForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formId: string, values: Record<string, any>): Promise<{
    success: boolean;
  }> => {
    setLoading(true); // Set loading to true
    setError(null); // Reset error state
    setSuccess(false); // Reset success state

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    try {
      const response = await axiosInstance.post(`/responses/${formId}/submit`, formData);
      setSuccess(true); // Set success state to true
      return { success: true };
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting the form.'); // Set error state
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }

    return { success: false };
  };

  return { submitForm, loading, error, success };
};

export default useSubmitForm;
