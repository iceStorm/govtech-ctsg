import { Button } from 'antd';
import Link from 'antd/es/typography/Link';
import { Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-2">
        <nav className="container flex items-center justify-between">
          <a href="/" className="inline-flex py-3 font-bold">
            SurveySG
          </a>

          <ul />

          <div className="flex items-center gap-5">
            {pathname !== '/login' && (
              <Link href="/login" target="">
                Login
              </Link>
            )}

            {pathname !== '/sign-up' && (
              <Link href="/sign-up">
                <Button>Create account</Button>
              </Link>
            )}
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
