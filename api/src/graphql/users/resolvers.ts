const path = require('path');
const S3 = require('aws-sdk/clients/s3');

import { withAuth } from '../authentication/middleware';
import withPagination from '../common/middleware/withPagination';
import User from './User';
import RefreshToken from '../authentication/RefreshToken';
import auth from '../authentication/passwordHash';
import pageInfo from '../common/PageInfo';

export default {
  Query: withAuth({
    viewer: (obj, args, { authScope }) => {
      return User.query()
      .findById(authScope.id);
    },
    users: withPagination((_, args) => {
      return User.query();
    }, 'UserConnection', module),
  }),
  Mutation: withAuth({
    updateProfile: async (_, { input }, { authScope }) => {
      if ('password' in input) {
        // TODO Validate password
        input.password = await auth.hash(input.password);
      }
      if ('languages' in input) {
        input.languages = input.languages.map(id => ({ id }));
      }
      return User.query()
      // .patch(input)
      .upsertGraph({
        id: authScope.id,
        ...input
      },
      {
        relate: true,
        unrelate: true
      })
      // .where('id', authScope.id)
      .returning('user.*')
      .first()
      .then(viewer => {
        if (input.password) {
          RefreshToken.query()
          .where('userId', authScope.id)
          .delete()
          .catch(err => console.error(err));
        }
        return {
          viewer,
        };
      })
      .catch(err => {
        console.error(err);
        return err;
      });
    },
    uploadAvatar: async (_, { file }, { authScope }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      // TODO Validate file metadata.
      const s3 = new S3({ apiVersion: '2006-03-01' });
      return s3.upload({
        Bucket: 'process.env.S3_AVATAR_BUCKET',
        Key: `users/${authScope.id}-${(new Date()).getTime()}${path.extname(filename)}`,
        Body: createReadStream(),
        ACL: 'public-read',
        ContentType: mimetype,
      }).promise()
      .then(({ Location }) => {
        return User.query()
        .patch({
          // @ts-ignore
          avatarUrl: Location,
        })
        .findById(authScope.id)
        .returning('*')
        .then(viewer => {
          return {
            viewer,
          }
        });
      })
      .catch(err => {
        console.error('Error uploading avatar.')
        console.error(err)
      });
    },
  }),
  User: {
    // email: (user, _, { authScope }) => (user.id === authScope.id || authScope.isAdmin) ? user.email : null,
    isViewer: (user, _, { authScope }) => (user.id === authScope.id),
  },
}
