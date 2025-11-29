import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className="animate-fadeIn"
      style={{ animationDuration: '0.3s' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
