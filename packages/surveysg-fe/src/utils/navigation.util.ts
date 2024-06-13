import AppRoutes from '~/constants/AppRoutes';
import AppRouter from '~/router';

/**
 * Redirect to SSO login page with an originated URL.
 */
const navigateToLoginPage = () => {
  const { pathname, search } = window.location;

  const returnUrl = pathname + search;

  new URLSearchParams().set('originated', returnUrl);

  AppRouter.navigate(AppRoutes.Login);
};

export default navigateToLoginPage;
