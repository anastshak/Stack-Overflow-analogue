export interface UserInfo {
  id: string;
  username: string;
  role: string;
}

export interface CommentInfo {
  id: string;
  content: string;
}

export interface MarkInfo {
  id: string;
  type: 'like' | 'dislike';
  user: UserInfo;
}

export interface ApiSnippet {
  id: string;
  code: string;
  language: string;
  user: UserInfo;
  comments: CommentInfo[];
  marks: MarkInfo[];
}

export interface ApiResponse {
  data: ApiSnippet[];
  links: {
    current: string;
    next?: string;
    last: string;
  };
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

// necessary type
export interface SnippetModel {
  id: string;
  code: string;
  language: string;
  creator: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
  userMark?: 'like' | 'dislike';
}
