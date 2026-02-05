import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../layouts';
import { GlobalLoading } from '../components/Loading';
import { ScrollToTop } from '../components/ScrollToTop';

// Lazy Load Pages
const Login = lazy(() => import('../pages/auth/Login').then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Components = lazy(() => import('../pages/components/Components').then(module => ({ default: module.Components })));
const EditProfile = lazy(() => import('../pages/edit-profile/EditProfile').then(module => ({ default: module.EditProfile })));
const NotFound = lazy(() => import('../pages/NotFound').then(module => ({ default: module.NotFound })));

// Root Layout to include global listeners like ScrollToTop
const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

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
            {
              path: 'components',
              element: (
                <Suspense fallback={<GlobalLoading />}>
                  <Components />
                </Suspense>
              ),
            },
            {
              path: 'edit-profile',
              element: (
                <Suspense fallback={<GlobalLoading />}>
                  <EditProfile />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<GlobalLoading />}>
              <NotFound />
            </Suspense>
          ),
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};
