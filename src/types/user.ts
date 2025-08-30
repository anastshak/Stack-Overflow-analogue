export interface UserInfo {
  id: string;
  username: string;
  role: string;
}

export interface UserStatistic {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
}

export interface UserWithStatistic extends UserInfo {
  statistic: UserStatistic;
}

export interface UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface UpdateUserUsername {
  username: string;
}

export interface UpdatedUser extends UserInfo {
  password: string;
}
