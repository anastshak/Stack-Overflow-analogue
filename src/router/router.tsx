import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SnippetDetails } from '../pages/SnippetDetails';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Users } from '../pages/Users';
import { UserDetails } from '../pages/UserDetails';
import { Questions } from '../pages/Questions';

export const router = createBrowserRouter([
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
]);
