import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PostDetails } from '../pages/PostDetails';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Users } from '../pages/Users';
import { UserDetails } from '../pages/UserDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/posts/:id',
    element: <PostDetails />,
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
]);
