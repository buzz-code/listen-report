import ReportKindergarten from '../models/reportKindergarten.model';
import KindergartenStudent from '../models/kindergartenStudent.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';

export const { findById, store, update, destroy, uploadMultiple } = genericController(ReportKindergarten);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new ReportKindergarten({ user_id: req.currentUser.id })
        .query(qb => {
            qb.innerJoin('kindergarten_students', 'kindergarten_students.id', 'report_kindergarten.student_id')
            qb.select('report_kindergarten.*')
        });
    applyFilters(dbQuery, req.query.filters);
    fetchPage({ dbQuery }, req.query, res);
}


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
