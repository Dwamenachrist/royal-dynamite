import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches.
 * Useful for responsive logic that can't be handled by CSS alone.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setTimeout(() => setMatches(media.matches), 0);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
}

/**
 * Shorthand for mobile detection (max-width: 768px)
 */
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 768px)");
}
