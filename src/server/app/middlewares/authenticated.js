import { jwtVerify } from '@utl';

let token;
let decode;

const isAuthenticated = async (ctx, next) => {
  try {
    token = ctx.request.headers.authorization;
    decode = await jwtVerify(token);
  } catch (e) {
    ctx.throw(401, e.message);
  } finally {
    if (!decode) {
      ctx.throw(401, { message: 'Token has expired' });
    }
    ctx.state.user = decode;
    await next();
  }
};

const refreshMid = async (ctx, next) => {
  try {
    token = ctx.request.headers.authorization;
    decode = await jwtVerify(token);
  } catch (e) {
    console.log(e.name); //eslint-disable-line
  } finally {
    if (!decode) {
      ctx.throw(401, { message: 'Token has expired' });
    }
    ctx.state.user = decode;
    ctx.state.user.token = token;
    await next();
  }
};

const isArtist = async (ctx, next) => {
  if (ctx.state.user.data.acc_type !== 'artist') {
    ctx.throw(401, { message: 'You do not have permission' });
  }
  await next();
};

const isPromoter = async (ctx, next) => {
  if (ctx.state.user.data.acc_type !== 'promoter') {
    ctx.throw(401, { message: 'You do not have permission' });
  }
  await next();
};

const isClub = async (ctx, next) => {
  if (ctx.state.user.data.acc_type !== 'club') {
    ctx.throw(401, { message: 'You do not have permission' });
  }
  await next();
};

const isAdmin = async (ctx, next) => {
  if (ctx.state.user.data.acc_type !== 'admin') {
    ctx.throw(401, { message: 'You do not have permission' });
  }
  await next();
};

export {
  isAuthenticated,
  refreshMid,
  isArtist,
  isPromoter,
  isClub,
  isAdmin
};
