import bookshelf from '../../common-modules/server/config/bookshelf';
import User from './user.model';

const TABLE_NAME = 'kindergarten_students';

/**
 * Student model.
 */
class KindergartenStudent extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }
    
    user() {
        return this.belongsTo(User);
    }
}

export default KindergartenStudent;