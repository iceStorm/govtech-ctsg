import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { IAppRoute } from './IAppRoute';
import RouteWrapperComponent from './RouteWrapperComponent';

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
  createBrowserRouter(mapRouteConfigs(predefinedRouteConfigs));

export default generateRouter;
