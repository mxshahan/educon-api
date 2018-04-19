import { isAuthenticated } from '@mid';
import {
  IndexUser,
  LoginUser,
  singleUser,
  SignUpUser,
  updateUser,
  deleteUser
} from './controller';

export const baseUrl = '/api/user';

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      isAuthenticated,
      IndexUser
    ]
  },
  {
    method: 'POST',
    route: '/login',
    handlers: [
      LoginUser
    ]
  },
  {
    method: 'POST',
    route: '/signup',
    handlers: [
      SignUpUser
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      isAuthenticated,
      singleUser
    ]
  },
  {
    method: 'PUT',
    route: '/',
    handlers: [
      isAuthenticated,
      updateUser
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      deleteUser
    ]
  }
];
