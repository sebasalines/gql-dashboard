import ModelBase from '../../ModelBase';

class RecoveryToken extends ModelBase {
  static get tableName() {
    return 'recovery_token';
  }

  static get timestampable() {
    return true;
  }
}

export default RecoveryToken;
