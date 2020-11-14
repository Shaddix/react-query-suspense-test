import { useQuery } from "react-query";
import { useCallback } from "react";
import axios from 'axios';

export const rootUrl = 'https://gorest.co.in/public-api/';
export const usersUrl = rootUrl + 'users'
export const userListQueryId = 'users';

export type UserListDto = {
  id: number;
  name: string;
  email: string;
}
axios.interceptors.request.use ((config) => {
  config.headers.Authorization = 'Bearer ff69086b547ab75089a64e7c47968b2eddc369b0a852a79fe2dfaaa4b02f52f0';
  return config;
});
export function useUsersQuery() {
  const users = useQuery(userListQueryId, useCallback(async () => {
    const result = await fetch(usersUrl + '?page=1');
    return (await result.json()).data as UserListDto[];
  }, []), {suspense: true});
  return users;
}


export function useUserQuery(userId: number) {
  const users = useQuery([userListQueryId, userId], useCallback(async () => {
    const result = await fetch(usersUrl + '/' + userId);
    return (await result.json()).data as UserListDto;
  }, [userId]));
  return users;
}