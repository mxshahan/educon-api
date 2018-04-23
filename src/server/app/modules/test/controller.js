import { TestCrud } from './test.model';
import { UserCrud } from '../user/user.model';

let Tests;
let Test;
let TestData;
let User;
let isMatched;

const allTest = async (ctx) => {
  try {
    Tests = await TestCrud.get();
  } catch (e) {
    ctx.throw(400, e.message);
  } finally {
    ctx.body = {
      data: Tests,
      message: 'All Tests are here...'
    };
  }
};

const myTests = async (ctx) => {
  try {
    Tests = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.test',
      populate: 'trainer.test'
    });
  } catch (e) {
    ctx.throw(400, e.message);
  } finally {
    ctx.body = {
      data: Tests.trainer,
      message: 'Following Tests found...'
    };
  }
};

const singleTest = async (ctx) => {
  try {
    Test = await TestCrud.single({
      qr: { _id: ctx.params.id }
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    if (Test) {
      ctx.body = {
        data: Test,
        message: 'Test Found...'
      };
    } else {
      ctx.body = {
        message: 'Test Not Found.'
      };
    }
  }
};

const createTest = async (ctx) => {
  TestData = Object.assign({
    creator: ctx.state.user.uid
  }, ctx.request.body);
  try {
    Test = await TestCrud.create(TestData);
  } catch (e) {
    ctx.throw(500, e.message);
  } finally {
    User = await UserCrud.single({
      qr: { _id: ctx.state.user.uid }
    });
    // Adding Test ID in array
    User.trainer.test.push(Test._id);
    User.save(); // Saving Updated Test
    ctx.body = {
      data: Test,
      message: 'Test Created...'
    };
  }
};

const updateTest = async (ctx) => {
  try {
    Tests = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.test'
    });
    isMatched = Tests.trainer.test.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(412, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        Test = await TestCrud.put({
          params: {
            qr: { _id: ctx.params.id }
          },
          body: ctx.request.body
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          data: Test,
          message: 'Test Updated...'
        };
      }
    } else {
      ctx.body = {
        message: 'You don\'t have rights to edit this Test'
      };
    }
  }
};

const deleteTest = async (ctx) => {
  try {
    Tests = await UserCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'trainer.test'
    });
    isMatched = Tests.trainer.test.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(412, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        Test = await TestCrud.delete({
          params: {
            qr: { _id: ctx.params.id }
          }
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          data: Test,
          message: 'Test Deleted...'
        };
      }
    } else {
      ctx.body = {
        message: 'You don\'t have rights to delete this Test'
      };
    }
  }
};

export {
  allTest,
  myTests,
  singleTest,
  createTest,
  updateTest,
  deleteTest
};
