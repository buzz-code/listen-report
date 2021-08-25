import ReportKindergarten from '../models/reportKindergarten.model';
import KindergartenStudent from '../models/kindergartenStudent.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController from '../../common-modules/server/controllers/generic.controller';

export const { findAll, findById, store, update, destroy, uploadMultiple } = genericController(ReportKindergarten);


/**
 * Get edit data
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getEditData(req, res) {
    const [students] = await Promise.all([
        getListFromTable(KindergartenStudent, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { students }
    });
}
