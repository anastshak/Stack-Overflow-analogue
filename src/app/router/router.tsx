import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '../error/ErrorBoundary';
import { routes } from './routes';

export const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: (
      <ErrorBoundary>
        <Suspense fallback={<div className="text-3xl text-center absolute w-full top-1/2">Loading...</div>}>
          <route.element />
        </Suspense>
      </ErrorBoundary>
    ),
  })),
);
