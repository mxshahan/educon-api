import { generateJwt } from '@utl';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import { UserCrud } from './user.model';

let Users;
let User;
let newTd;
let VerifyUser;
let UserData;
let token;

const LoginUser = async (ctx) => {
  Users = await UserCrud.single({
    qr: { email: ctx.request.body.email }
  });
  try {
    if (Users) {
      VerifyUser = await compareSync(ctx.request.body.password, Users.password);
    }
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    if (VerifyUser) {
      token = await generateJwt({
        uid: Users._id
      });
      ctx.body = {
        data: {
          userType: Users.userType,
          token
        },
        message: 'Login Successfull...'
      };
    }
  }
};

const SignUpUser = async (ctx) => {
  const {
    firstname, lastname, email, username, password, userType
  } = ctx.request.body;

  UserData = {
    firstname,
    lastname,
    email,
    username,
    userType,
    password: hashSync(password)
  };
  try {
    newTd = await UserCrud.create(UserData);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    token = await generateJwt({
      uid: newTd._id
    });
    ctx.body = {
      data: {
        userType: newTd.userType,
        token
      },
      message: 'Sign Up Successfull...'
    };
  }
};

const IndexUser = async (ctx) => {
  try {
    Users = await UserCrud.single({
      qr: { _id: ctx.state.user.uid }
    });
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    if (Users) {
      ctx.body = {
        data: Users,
        message: 'Your Data Matched...'
      };
    } else {
      ctx.body = {
        message: 'No User Matched...'
      };
    }
  }
};

const singleUser = async (ctx) => {
  try {
    User = await UserCrud.single({
      qr: { _id: ctx.params.id }
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      data: User,
      message: 'User Found...'
    };
  }
};

const updateUser = async (ctx) => {
  UserData = ctx.request.body;
  if (UserData.password) {
    UserData.password = hashSync(UserData.password);
  }
  try {
    User = await UserCrud.put({
      params: {
        qr: { _id: ctx.state.user.uid }
      },
      body: UserData
    });
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    ctx.body = {
      data: User,
      message: 'User Updated...'
    };
  }
};

const deleteUser = async (ctx) => {
  try {
    User = await UserCrud.delete({
      params: {
        qr: { _id: ctx.state.user.uid }
      }
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      data: User,
      message: 'User Deleted...'
    };
  }
};

export {
  IndexUser,
  LoginUser,
  SignUpUser,
  singleUser,
  updateUser,
  deleteUser
};
