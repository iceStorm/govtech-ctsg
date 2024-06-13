import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import AppRoutes from '~/constants/AppRoutes';
import useAuthentication from '~/hooks/useAuthentication';
import useReturnUrl from '~/hooks/useReturnUrl';

import { IAppRoute } from './IAppRoute';

type RouteWrapperComponentProps = {
  customRouteObject: IAppRoute;
};

export default function RouteWrapperComponent(props: RouteWrapperComponentProps) {
  const {
    customRouteObject: { element, requireAuth, title },
  } = props;

  const returnUrl = useReturnUrl();
  const { isLoggedIn } = useAuthentication();

  // compose essential components for a page
  const mappedComponent = (
    <>
      {title && <Helmet title={title} />}
      {element}
    </>
  );

  if (requireAuth) {
    if (!isLoggedIn) {
      return <Navigate to={AppRoutes.Login} state={{ originated: returnUrl }} />;
    }

    return mappedComponent;
  }

  return mappedComponent;
}
