import ModelBase from '../../ModelBase';

class User extends ModelBase {
  static get timestampable () {
    return true;
  }

  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
    //   organizations: {
    //     relation: Model.ManyToManyRelation,
    //     modelClass: Organization,
    //     join: {
    //       from: 'user.id',
    //       through: {
    //         from: 'user_organization.userId',
    //         to: 'user_organization.organizationId'
    //       },
    //       to: 'organization.id'
    //     }
    //   },
    //   languages: {
    //     relation: Model.ManyToManyRelation,
    //     modelClass: Language,
    //     join: {
    //       from: 'user.id',
    //       through: {
    //         from: 'user_languages.userId',
    //         to: 'user_languages.languageId'
    //       },
    //       to: 'language.id'
    //     }
    //   },
    //   applications: {
    //     relation: Model.HasManyRelation,
    //     modelClass: JobApplication,
    //     join: {
    //       from: 'user.id',
    //       to: 'job_application.userId'
    //     }
    //   },
    }
  }
}

export default User;
