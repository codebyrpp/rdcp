import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import axiosInstance from '@/state/axiosInstance';

export type UserSuggestion = {
  id: string;
  email: string;
};

const useEmailSearch = () => {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);

  // Function to fetch suggestions
  const fetchSuggestions = async (email: string) => {
    try {
      const response = await axiosInstance.get('/users/search', { params: { email } });
      const results = response.data as UserSuggestion[];
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Debounced function to avoid frequent API calls
  const debouncedFetchSuggestions = useCallback(
    debounce((email: string) => {
      if (email) {
        fetchSuggestions(email);
      } else {
        setSuggestions([]); // Clear suggestions if no input
      }
    }, 300),
    []
  );

  return { suggestions, debouncedFetchSuggestions };
};

export default useEmailSearch;
