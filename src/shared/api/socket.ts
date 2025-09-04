import { io } from 'socket.io-client';

const isDev = import.meta.env.DEV;

export const socket = io(isDev ? '/api' : 'https://codelang.vercel.app/api', {
  path: '/socket.io',
  withCredentials: true,
  transports: ['websocket'],
});

// export const socket = io(isDev ? 'http://localhost:5173' : 'https://codelang.vercel.app', {
//   path: '/socket.io',
//   withCredentials: true,
//   transports: ['websocket'],
// });

// check
// socket.on('connect', () => console.log('✅ Socket connected:', socket.id));
// socket.on('disconnect', (reason) => console.log('❌ Socket disconnected:', reason));

//Socket connection error: server error
// socket.on('connect_error', (err) => console.error('❌ Socket connection error:', err.message));

// Socket status: Disconnected
// setTimeout(() => {
//   console.log('📊 Socket status:', socket.connected ? 'Connected' : 'Disconnected');
// }, 1000);
