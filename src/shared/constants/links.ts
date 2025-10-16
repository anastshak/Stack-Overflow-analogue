import { lazy } from 'react';

export const Home = lazy(() => import('@pages/Home'));
export const Posts = lazy(() => import('@pages/SnippetDetails'));
export const Register = lazy(() => import('@pages/Register'));
export const Login = lazy(() => import('@pages/Login'));
export const Users = lazy(() => import('@pages/Users'));
export const UserDetails = lazy(() => import('@pages/UserDetails'));
export const Questions = lazy(() => import('@pages/Questions'));
export const QuestionDetails = lazy(() => import('@pages/QuestionDetails'));
export const MyAccount = lazy(() => import('@pages/MyAccount'));
export const PostSnippet = lazy(() => import('@pages/PostSnippet'));
export const MySnippets = lazy(() => import('@pages/MySnippets'));
export const NotFoundError = lazy(() => import('@pages/NotFoundError'));
