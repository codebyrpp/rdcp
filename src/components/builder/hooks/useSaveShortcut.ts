import { useEffect } from 'react';

const useSaveShortcut = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();  // Prevent the default "Save Page" action
        callback();  // Call the provided callback function
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);  // Clean up
    };
  }, [callback]);
};

export default useSaveShortcut;
