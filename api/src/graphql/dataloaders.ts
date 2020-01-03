import DataLoader from 'dataloader';
import User from "./users/User";

export default function({ id, isAdmin }) {
  return {
    user: {
      users: new DataLoader<any, any>(ids => {
        return User.query()
        .whereIn('id', ids)
        //
        .then(rows => ids.map(userId => rows.find((user: any) => user.id === userId)));
      }),
    },
  };
};
