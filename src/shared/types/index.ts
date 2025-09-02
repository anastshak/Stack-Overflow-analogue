export interface Links {
  current: string;
  next?: string;
  last: string;
}

export interface Meta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponseBase<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

export interface UserInfo {
  id: string;
  username: string;
  role: string;
}
