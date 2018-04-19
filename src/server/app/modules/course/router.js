import { isAuthenticated } from '@mid';
import {
  allCourse,
  myCourses,
  singleCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from './controller';

export const baseUrl = '/api/course';

export const routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      isAuthenticated,
      allCourse
    ]
  },
  {
    method: 'GET',
    route: '/mycourses',
    handlers: [
      isAuthenticated,
      myCourses
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      isAuthenticated,
      singleCourse
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      isAuthenticated,
      createCourse
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      isAuthenticated,
      updateCourse
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      isAuthenticated,
      deleteCourse
    ]
  }
];
