import { RouteObject, createHashRouter } from 'react-router-dom';

import RouteWrapperComponent from '~/components/RouteWrapper';
import { IAppRoute } from '~/models/IAppRoute';

const mapRouteConfigs = (customRouteObjects: IAppRoute[]): RouteObject[] => {
  return customRouteObjects.map((routeObject) => {
    const { requireAuth, ...defaultRouteProps } = routeObject;

    const finalRouteObject: RouteObject = {
      ...defaultRouteProps,
    };

    if (routeObject.element) {
      finalRouteObject.element = <RouteWrapperComponent customRouteObject={routeObject} />;
    }

    // recursively map children of this route
    if ('children' in routeObject && routeObject.children!.length > 0) {
      finalRouteObject.children = mapRouteConfigs(routeObject.children!);
    }

    return finalRouteObject;
  });
};

const generateRouter = (predefinedRouteConfigs: IAppRoute[]) =>
  createHashRouter(mapRouteConfigs(predefinedRouteConfigs));

export default generateRouter;
