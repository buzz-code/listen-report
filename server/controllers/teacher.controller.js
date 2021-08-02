import Teacher from '../models/teacher.model';
import genericController from '../../common-modules/server/generic.controller';

export const { findAll, findById, store, update, destroy, uploadMultiple } = genericController(Teacher);