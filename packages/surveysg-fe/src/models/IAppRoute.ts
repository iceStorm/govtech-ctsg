import { RouteObject } from 'react-router-dom';
import { Except } from 'type-fest';

type DiscriminatedIndexRoute = Except<RouteObject, 'children'> &
  ({ index: true } | { index?: false; children?: IAppRoute[] });

export type IAppRoute = DiscriminatedIndexRoute & {
  /**
   * Authentication/Authorization requirements for a route.
   */
  requireAuth?: boolean;

  title?: string;
};
