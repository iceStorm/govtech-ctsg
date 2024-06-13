import { type ParamsFromUrl } from '@ts-rest/core';

import { TRoutePath } from '@/configs/routerConfigs/routePaths';

declare module 'react-router' {
  /**
   * Allow extracting parameters from a url into an object.
   *
   * @example ```typescript
   * enum RoutePath = {
   *  POST_LIST = '/posts/:postId/comments/:commentId'
   * };
   *
   * // inside a component:
   * // type-safe from url string
   * // { postId: string, commentId: string } <-- url parameters (path params) are always string
   * const { postId, commentId } = useParams<RoutePath.POST_LIST>()
   * ```
   */
  function useParams<TRoute extends TRoutePath>(route: TRoute): ParamsFromUrl<TRoute>;
}
