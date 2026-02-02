import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../components/Layout';
import { GlobalLoading } from '../components/Loading';
import { ScrollToTop } from '../components/ScrollToTop';

// Lazy Load Pages
const Login = lazy(() => import('../pages/auth/Login').then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));

// Root Layout to include global listeners like ScrollToTop
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />, // Wrap everything
      children: [
        {
          path: '/auth/login',
          element: (
            <Suspense fallback={<GlobalLoading />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<GlobalLoading />}>
                  <Dashboard />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '*',
          element: <div>404 Not Found</div>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};
