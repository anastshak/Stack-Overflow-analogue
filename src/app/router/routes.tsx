import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    element: lazy(() => import('@pages/Home')),
  },
  {
    path: '/posts/:id',
    element: lazy(() => import('@pages/SnippetDetails')),
  },
  {
    path: '/signup',
    element: lazy(() => import('@pages/Register')),
  },
  {
    path: '/login',
    element: lazy(() => import('@pages/Login')),
  },
  {
    path: '/users',
    element: lazy(() => import('@pages/Users')),
  },
  {
    path: '/users/:id',
    element: lazy(() => import('@pages/UserDetails')),
  },
  {
    path: '/questions',
    element: lazy(() => import('@pages/Questions')),
  },
  {
    path: '/questions/:id',
    element: lazy(() => import('@pages/QuestionDetails')),
  },
  {
    path: '/account',
    element: lazy(() => import('@pages/MyAccount')),
  },
  {
    path: '/post',
    element: lazy(() => import('@pages/PostSnippet')),
  },
  {
    path: '/mysnippets',
    element: lazy(() => import('@pages/MySnippets')),
  },
  {
    path: '*',
    element: lazy(() => import('@pages/NotFoundError')),
  },
];
