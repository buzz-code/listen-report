import ReportTeacher from '../models/reportTeacher.model';
import Teacher from '../models/teacher.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController from '../../common-modules/server/controllers/generic.controller';

export const { findAll, findById, store, update, destroy, uploadMultiple } = genericController(ReportTeacher);


/**
 * Get edit data
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getEditData(req, res) {
    const [teachers] = await Promise.all([
        getListFromTable(Teacher, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { teachers }
    });
}
