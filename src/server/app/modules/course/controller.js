import { CourseCrud } from './course.model';
import { UserCrud } from '../user/user.model';

let Courses;
let Course;
let CourseData;
let User;
let isMatched;

const allCourse = async (ctx) => {
  try {
    Courses = await CourseCrud.get();
  } catch (e) {
    ctx.throw(400, e.message);
  } finally {
    ctx.body = {
      data: Courses,
      message: 'All Courses are here...'
    };
  }
};

const myCourses = async (ctx) => {
  try {
    Courses = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.courses',
      populate: 'trainer.courses'
    });
  } catch (e) {
    ctx.throw(400, e.message);
  } finally {
    ctx.body = {
      data: Courses.trainer,
      message: 'Following courses found...'
    };
  }
};

const singleCourse = async (ctx) => {
  try {
    Course = await CourseCrud.single({
      qr: { _id: ctx.params.id }
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    if (Course) {
      ctx.body = {
        data: Course,
        message: 'Course Found...'
      };
    } else {
      ctx.body = {
        message: 'Course Not Found'
      };
    }
  }
};

const createCourse = async (ctx) => {
  CourseData = Object.assign({
    trainer: ctx.state.user.uid
  }, ctx.request.body);
  try {
    Course = await CourseCrud.create(CourseData);
  } catch (e) {
    ctx.throw(500, e.message);
  } finally {
    User = await UserCrud.single({
      qr: { _id: ctx.state.user.uid }
    });
    // Adding course ID in array
    User.trainer.courses.push(Course._id);
    User.save(); // Saving Updated Course
    ctx.body = {
      data: Course,
      message: 'Course Created...'
    };
  }
};

const updateCourse = async (ctx) => {
  try {
    Courses = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.courses'
    });
    isMatched = Courses.trainer.courses.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(412, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        Course = await CourseCrud.put({
          params: {
            qr: { _id: ctx.params.id }
          },
          body: ctx.request.body
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          data: Course,
          message: 'Course Updated...'
        };
      }
    } else {
      ctx.body = {
        message: 'You don\'t have rights to edit this course'
      };
    }
  }
};

const deleteCourse = async (ctx) => {
  try {
    Courses = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.courses'
    });
    isMatched = Courses.trainer.courses.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(412, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        Course = await CourseCrud.delete({
          params: {
            qr: { _id: ctx.params.id }
          }
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          data: Course,
          message: 'Course Deleted...'
        };
      }
    } else {
      ctx.body = {
        message: 'You don\'t have rights to delete this Course'
      };
    }
  }
};

export {
  allCourse,
  myCourses,
  singleCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
