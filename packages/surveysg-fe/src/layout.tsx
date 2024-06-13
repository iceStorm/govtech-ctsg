import { Button } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

import useAuthentication from './hooks/useAuthentication';

export default function MainLayout() {
  const { pathname } = useLocation();

  const { isLoggedIn, logOut } = useAuthentication();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-2">
        <nav className="container flex items-center justify-between">
          <Link to="/" className="inline-flex py-3 font-bold">
            SurveySG
          </Link>

          <ul />

          <div className="flex items-center gap-5">
            {!isLoggedIn && pathname !== '/login' && (
              <Link to="/login" target="">
                Login
              </Link>
            )}

            {!isLoggedIn && pathname !== '/sign-up' && (
              <Link to="/sign-up">
                <Button>Create account</Button>
              </Link>
            )}

            {isLoggedIn && <Button onClick={logOut}>Logout</Button>}
          </div>
        </nav>
      </header>

      <main className="flex-1 container py-10">
        <Outlet />
      </main>

      <footer />
    </div>
  );
}
