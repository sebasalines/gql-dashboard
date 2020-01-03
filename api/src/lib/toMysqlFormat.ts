import moment from 'moment';

export default function (input?: Date | moment.Moment) {
  const date = input ? moment(input) : moment();
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};