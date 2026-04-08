import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset scroll to top on route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Use instant to avoid visible jump
        });

        // Also reset any possible scroll containers if they exist
        document.body.scrollTo(0, 0);
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
