import ModelBase from '../../ModelBase';

class RefreshToken extends ModelBase {
  static get timestampable () {
    return true;
  }

  static get tableName() {
    return 'user_refreshtoken';
  }
}

export default RefreshToken;
