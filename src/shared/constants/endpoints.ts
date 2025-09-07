export const API_ENDPOINTS = {
  ACCOUNT: {
    ME: '/me',
    ME_PASSWORD: '/me/password',
  },

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/register',
    LOGOUT: '/auth/logout',
  },

  QUESTIONS: {
    BASE: '/questions',
    WITH_SORT: '/questions?sortBy=id:DESC',
    BY_ID: (id: string) => `/questions/${id}`,
  },

  SNIPPETS: {
    BASE: '/snippets',
    BY_ID: (id: string) => `/snippets/${id}`,
    MARK: (id: string) => `/snippets/${id}/mark`,
    LANGUAGES: '/snippets/languages',
  },

  COMMENTS: {
    BASE: '/comments',
  },

  USERS: {
    BASE: '/users',
    BY_ID_STATISTIC: (id: string) => `/users/${id}/statistic`,
  },
};
