import KindergartenStudent from '../models/kindergartenStudent.model';
import genericController from '../../common-modules/server/controllers/generic.controller';

export const { findAll, findById, store, update, destroy, uploadMultiple } = genericController(KindergartenStudent);