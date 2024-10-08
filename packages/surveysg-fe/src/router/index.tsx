import queryString from 'query-string';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { AppStaticInitializer } from '~/components/AppStatic';
import AppRoutes from '~/constants/AppRoutes';
import MainLayout from '~/layout';
import NotFoundPage from '~/pages/errors/not-found';
import HomePage from '~/pages/home';
import LoginPage from '~/pages/login';
import ProfilePage from '~/pages/profile';
import SignUpPage from '~/pages/sign-up';

import { IAppRoute } from '../models/IAppRoute';

import generateRouter from './utils';

const routes: IAppRoute[] = [
  {
    path: '',
    element: (
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: queryString.parse,
          objectToSearchString: queryString.stringify,
        }}
      >
        <AppStaticInitializer />
        <MainLayout />
      </QueryParamProvider>
    ),
    children: [
      { index: true, element: <HomePage />, title: 'Home' },

      { path: AppRoutes.Login, element: <LoginPage />, title: 'Login' },

      {
        path: AppRoutes.CreateAccount,
        element: <SignUpPage />,
        requireAuth: true,
        title: 'Create Account',
      },

      { path: AppRoutes.Profile, element: <ProfilePage />, requireAuth: true, title: 'Profile' },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const AppRouter = generateRouter(routes);

export default AppRouter;
