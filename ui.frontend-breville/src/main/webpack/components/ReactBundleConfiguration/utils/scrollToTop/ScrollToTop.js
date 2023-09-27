import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Util component to scroll to the top of the page on each route change using React Router
 * @returns {null}
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect( () => {
    window.scrollTo( 0, 0 );
  }, [pathname] );

  return null;
}
