import ReportTeacher from '../models/reportTeacher.model';
import Teacher from '../models/teacher.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';
import bookshelf from '../../common-modules/server/config/bookshelf';

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


/**
 * Get teacher report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getTeacherSalaryReport(req, res) {
    const dbQuery = new ReportTeacher().where({ 'report_teachers.user_id': req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.id', 'report_teachers.teacher_id')
            qb.leftJoin('teacher_types', 'teacher_types.id', 'teachers.teacher_type_id')
            qb.select('report_teachers.*')
            qb.select({
                teacher_name: 'teachers.name',
                teacher_tz: 'teachers.tz',
                teacher_type_name: 'teacher_types.name',
                teacher_salary: bookshelf.knex.raw('(IF(lessons_number, lessons_number, 0) * watching_students * 10 + teaching_students * 55 + was_telephone * 60)')
            })
        });
    applyFilters(dbQuery, req.query.filters);
    fetchPage({ dbQuery }, req.query, res);
}

export function getTeacherSalarySummaryReport(req, res) {
    const dbQuery = new ReportTeacher().where({ 'report_teachers.user_id': req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.id', 'report_teachers.teacher_id')
            qb.leftJoin('teacher_types', 'teacher_types.id', 'teachers.teacher_type_id')
        });
    applyFilters(dbQuery, req.query.filters);
    const countQuery = dbQuery.clone().query()
        .countDistinct({ count: ['teachers.name', 'teachers.tz', 'speciallity'] })
        .then(res => res[0].count);
    dbQuery.query(qb => {
        qb.groupBy('teacher_name', 'teacher_tz', 'teacher_type_name', 'speciallity')
        qb.select('speciallity')
        qb.select({
            teacher_name: 'teachers.name',
            teacher_tz: 'teachers.tz',
            teacher_type_name: 'teacher_types.name',
        })
        qb.sum({
            teacher_salary: bookshelf.knex.raw('(IF(lessons_number, lessons_number, 0) * watching_students * 10 + teaching_students * 55 + was_telephone * 60)')
        })
    });
    fetchPage({ dbQuery, countQuery }, req.query, res);
}