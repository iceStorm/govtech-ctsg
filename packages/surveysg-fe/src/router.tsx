import { RouteObject, createBrowserRouter } from 'react-router-dom';

import MainLayout from './layout';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/sign-up/SignUpPage';

const routes: RouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: '/login', element: <LoginPage /> },
      { path: '/sign-up', element: <SignUpPage /> },

      { path: '/profile', element: <ProfilePage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
