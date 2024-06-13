import { useLocation } from 'react-router-dom';

/**
 * Capture current page's url.
 */
export default function useReturnUrl() {
  const location = useLocation();

  const { pathname, search } = location;
  const returnUrl = pathname + search;

  return returnUrl;
}
