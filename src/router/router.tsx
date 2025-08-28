import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SnippetDetails } from '../pages/SnippetDetails';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Users } from '../pages/Users';
import { UserDetails } from '../pages/UserDetails';
import { Questions } from '../pages/Questions';
import { QuestionDetails } from '../pages/QuestionDetails';
import { PageNotFound } from '../pages/NotFoundError';
import { ErrorBoundary } from '../components/ErrorBoundary';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/posts/:id',
    element: <SnippetDetails />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/users/:id',
    element: <UserDetails />,
  },
  {
    path: '/questions',
    element: <Questions />,
  },
  {
    path: '/questions/:id',
    element: <QuestionDetails />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
].map((route) => ({
  ...route,
  element: <ErrorBoundary>{route.element}</ErrorBoundary>,
}));

export const router = createBrowserRouter(routes);
