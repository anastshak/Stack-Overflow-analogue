import { io } from 'socket.io-client';

const isDev = import.meta.env.DEV;

export const socket = io(isDev ? '/api' : 'https://codelang.vercel.app/api', {
  path: '/socket.io',
  withCredentials: true,
  transports: ['websocket'],
});
