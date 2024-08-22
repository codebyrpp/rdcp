import { useRef, useEffect } from "react";

export const useSearchRef = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // when user presses '/' focus on search input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return searchInputRef;
}
