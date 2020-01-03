import { ApolloError, UserInputError } from 'apollo-server';
import util from 'util';
const randomBytes = util.promisify(require('crypto').randomBytes);

import User from '../users/User';
import RefreshToken from './RefreshToken';
import RecoveryToken from './RecoveryToken';
import auth from './passwordHash';
import userToken from './UserToken';

// const { ip2long } = require('../../lib/ip2long');

const refreshToken = async ({ viewer }) => {
  const refreshToken = await randomBytes(32)
  const tokenBase64 = refreshToken.toString('base64');
  RefreshToken.query()
    .insert({
      // @ts-ignore
      userId: viewer.id,
      refreshToken: RefreshToken.knex().raw(`decode('${tokenBase64}', 'base64')`),
      // TODO ip:
    })
    .catch(err => console.error(err));
  return tokenBase64;
};

const LoginPayload = {
  refreshToken
};

const SignupPayload = {
  refreshToken
};

const ResetPasswordPayload = {
  refreshToken
};

export default {
  Mutation: {
    login: (_, { input }) => {
      const { email } = input;
      return User.query()
        .where({ email: email.toLowerCase() })
        .first()
        .then((user: any) => {
          console.log({ user, email })
          if (!user) {
            throw new UserInputError('Invalid credentials.');
          }
          return new Promise((resolve, reject) => {
            auth.validate(input.password, user.password, (err, validationResponse) => {
              if (err) {
                console.error('Password validation error: %s', err.message);
                reject(new Error('Internal error'));
              }
              if (!validationResponse) {
                reject(new UserInputError('Invalid credentials.'));
              }
              resolve(user);
            });
          });
        })
        .then((user: any) => {
          const payload: any = {
            sub: user.id,
            type: 'user.type',
          };
          if (input.asAdmin) {
            if (!user.isAdmin) {
              throw new UserInputError('Cannot login as admin user.');
            }
            payload.isAdmin = true;
          }
          return userToken.sign(payload)
            .then(token => {
              // res.cookie('token', token, {
              //   maxAge: 2592000000,
              //   httpOnly: true,
              // });
              return {
                token,
                viewer: user,
              }
            });
        });
    },
    signup: async (_, { input }) => {
      // const  = input.email.trim();
      let {
        email,
        password,
        firstName,
        lastName,
      } = input;
      // TODO Validate email
      if (password.length < 6) {
        throw new UserInputError('Password must be at least six characters.', { validationErrors: [{ password: 'Password must be at least six characters.' }] });
      }
      password = await auth.hash(input.password);
      return User.query()
        // @ts-ignore
        .insert({ firstName, lastName, email, password, isAdmin: false })
        .then(async (user) => {
          const payload = {
            sub: user.id,
          };
          return userToken.sign(payload)
            .then(token => ({
              token,
              viewer: user,
            }));
        })
        .catch(err => {
          if (err.code && err.code === '23505') {
            let errorMessage;
            switch (err.constraint) {
              case 'user_email_unique_ci':
                errorMessage = 'Email already exists.';
                break;
              default:
                errorMessage = 'Duplicate values.';
                break;
            }
            throw new UserInputError(errorMessage, { validationErrors: [{ email: errorMessage }] });
          }
          console.error(err);
          throw err;
        });
    },
    logout: (_, args, { res, token }) => {
      // res.clearCookie('token');
      // TODO
      return {
        success: true,
        token: null,
        refreshToken: null,
      };
    },
    recoverPassword: async (_, { input }) => {
      const email = input.email.trim();
      const user: any = await User.query()
        .where({ email })
        .first();
      if (!user) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }
      const buf = await randomBytes(32);
      const possible = '0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      try {
        const recoveryToken = await RecoveryToken.query()
          .insert({
            // @ts-ignore
            userId: user.id,
            stage: 1,
            token: buf.toString('hex'),
            code,
          });
        const token = [recoveryToken.id, recoveryToken.token].join('-');
        // await transactionalEmail.send(user.email, {
        //   email: user.email,
        //   code,
        // }, transactionalEmail.templates.RESET_PASSWORD);
        return {
          status: 'CODE_SENT',
          code,
          recoveryToken: token,
          recipient: user.email.replace(/^(.)(.*)(?=.@)/, (match, p1, p2) => p1 + '*'.repeat(p2.length)),
        };
      } catch (err) {
        console.error(err);
        throw new Error('Internal error.');
      }
    },
    verifyRecoveryCode: async (_, { input }) => {
      const token = input.recoveryToken.split('-');
      if (token.length !== 2) {
        throw new UserInputError('Invalid token');
      }
      const recoveryToken = await RecoveryToken.query()
        .where({
          id: token[0],
          stage: 1,
          token: token[1],
          code: input.code,
        })
        .first();
      if (!recoveryToken) {
        return {
          result: 'ERROR',
        };
      }
      const buf = await randomBytes(32)
        .then(buf => buf.toString('hex'));
      await recoveryToken.$query()
        .patch({
          // @ts-ignore
          stage: 2,
          token: buf,
          code: null,
        });
      return {
        result: 'OK',
        // @ts-ignore
        resetToken: [recoveryToken.id, recoveryToken.token].join('-'),
      };
    },
    resetPassword: async (_, { input }) => {
      const resetToken = input.resetToken.split('-');
      if (resetToken.length !== 2) {
        throw new UserInputError('Invalid token');
      }
      const recoveryToken = await RecoveryToken.query()
        .where({
          id: resetToken[0],
          stage: 2,
          token: resetToken[1],
        })
        .first();
      if (!recoveryToken) {
        throw new Error('Invalid token');
      }
      const password = await auth.hash(input.password);
      const viewer = await User.query()
        // @ts-ignore
        .patchAndFetchById(recoveryToken.userId, { password });
      const payload = {
        sub: viewer.id,
      };
      const token = await userToken.sign(payload);
      recoveryToken.$query()
        .delete()
        .catch(err => console.error('Cannot delete recoveryToken', err));
      return {
        token,
        viewer,
      };
    },
  },
  LoginPayload,
  SignupPayload,
  ResetPasswordPayload,
}
 