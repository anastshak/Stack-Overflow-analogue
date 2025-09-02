import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/router/router.tsx';
import { useAuthStore } from '@shared/store/authStore.ts';
import { queryClient } from '@app/providers/queryClient.ts';

import './index.css';

useAuthStore.getState().restore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
