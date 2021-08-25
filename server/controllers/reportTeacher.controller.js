import ReportTeacher from '../models/reportTeacher.model';
import Teacher from '../models/teacher.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';

export const { findById, store, update, destroy, uploadMultiple } = genericController(ReportTeacher);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new ReportTeacher({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.id', 'report_teachers.teacher_id')
            qb.select('report_teachers.*')
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
    const [teachers] = await Promise.all([
        getListFromTable(Teacher, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { teachers }
    });
}
