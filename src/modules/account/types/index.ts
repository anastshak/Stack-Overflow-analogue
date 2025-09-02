import { UserInfo } from '@shared/types';

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
