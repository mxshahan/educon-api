import { isAuthenticated } from '@mid';
import {
  allTest,
  myTests,
  singleTest,
  createTest,
  updateTest,
  deleteTest
} from './controller';

export const baseUrl = '/api/test';

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      isAuthenticated,
      allTest
    ]
  },
  {
    method: 'GET',
    route: '/mytests',
    handlers: [
      isAuthenticated,
      myTests
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      isAuthenticated,
      singleTest
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      isAuthenticated,
      createTest
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      isAuthenticated,
      updateTest
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      isAuthenticated,
      deleteTest
    ]
  }
];
