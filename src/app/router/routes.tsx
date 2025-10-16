import {
  Home,
  Login,
  MyAccount,
  MySnippets,
  NotFoundError,
  Posts,
  PostSnippet,
  QuestionDetails,
  Questions,
  Register,
  UserDetails,
  Users,
} from '@shared/constants/links';

export const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/posts/:id',
    element: Posts,
  },
  {
    path: '/signup',
    element: Register,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/users',
    element: Users,
  },
  {
    path: '/users/:id',
    element: UserDetails,
  },
  {
    path: '/questions',
    element: Questions,
  },
  {
    path: '/questions/:id',
    element: QuestionDetails,
  },
  {
    path: '/account',
    element: MyAccount,
  },
  {
    path: '/post',
    element: PostSnippet,
  },
  {
    path: '/mysnippets',
    element: MySnippets,
  },
  {
    path: '*',
    element: NotFoundError,
  },
];
