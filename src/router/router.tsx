import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PostDetails } from '../pages/PostDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/posts/:id',
    element: <PostDetails />,
  },
]);
