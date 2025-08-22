import axios from 'axios';
import { BASE_URL } from '../constants';
import { UserInfo } from '../types';

export const registerUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post(`${BASE_URL}/register`, {
    username,
    password,
  });
  const { data: userData } = response.data;

  return userData;
};

export const loginUser = async (username: string, password: string): Promise<UserInfo> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
  });
  const { data: userData } = response.data;

  return userData;
};
