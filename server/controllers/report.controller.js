import HttpStatus from 'http-status-codes';
import { query } from 'winston';
import bookshelf from '../../common-modules/server/config/bookshelf';
import knex from '../../common-modules/server/config/knex';
import Report from '../models/report.model';
import ReportType from '../models/reportType.model';
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';

export const { findById, store, update, destroy, uploadMultiple } = genericController(Report);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.innerJoin('students', 'students.id', 'reports.student_id')
            qb.leftJoin('teachers', 'teachers.id', 'reports.teacher_id')
            qb.leftJoin('report_types', 'report_types.id', 'reports.report_type_id')
            qb.select('reports.*')
            qb.select({ student_group: 'students.group' })
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
    const [reportTypes, students, teachers] = await Promise.all([
        getListFromTable(ReportType, req.currentUser.id),
        getListFromTable(Student, req.currentUser.id),
        getListFromTable(Teacher, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { reportTypes, students, teachers }
    });
}

/**
 * Get student report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getStudentReport(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.innerJoin('students', 'students.id', 'reports.student_id')
        })
    applyFilters(dbQuery, req.query.filters);
    dbQuery.query(qb => {
        qb.select('students.tz as student_tz', 'students.name as student_name', 'students.group as student_group', 'report_date', 'enter_hour', 'exit_hour', 'lesson_number', 'other_students', 'report_type_id')
    });
    fetchPage({ dbQuery }, req.query, res);
}

/**
 * Get teacher report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getTeacherReport(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.id', 'reports.teacher_id')
        });
    applyFilters(dbQuery, req.query.filters);
    const countQuery = dbQuery.clone().query()
        .countDistinct({ count: ['reports.teacher_full_phone', bookshelf.knex.raw('ifnull(teachers.name, reports.teacher_full_phone)'), 'report_date', 'lesson_number'] })
        .then(res => res[0].count);
    dbQuery.query(qb => {
        qb.groupBy('teacher_full_phone', 'teacher_name', 'report_date', 'lesson_number')
        qb.select('reports.teacher_full_phone as teacher_full_phone', 'teachers.name as teacher_name', 'report_date', 'lesson_number')
        qb.count({ count: 'reports.id' })
        qb.avg({ avg: 'other_students' })
    });
    fetchPage({ dbQuery, countQuery }, req.query, res);
}

/**
 * Get organization report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getOrganizationReport(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.id', 'reports.teacher_id')
            qb.leftJoin('students', 'students.id', 'reports.student_id')
        });
    applyFilters(dbQuery, req.query.filters);
    const countQuery = dbQuery.clone().query()
        .countDistinct({ count: ['reports.teacher_full_phone', bookshelf.knex.raw('ifnull(teachers.name, reports.teacher_full_phone)'), 'report_date'] })
        .then(res => res[0].count);
    dbQuery.query(qb => {
        qb.groupBy('teacher_full_phone', 'teacher_name', 'report_date')
        qb.select('reports.teacher_full_phone as teacher_full_phone', 'teachers.name as teacher_name', 'report_date',
            bookshelf.knex.raw('GROUP_CONCAT(distinct students.name SEPARATOR ", ") as students'))
    });
    fetchPage({ dbQuery, countQuery }, req.query, res);
}

/**
 * Get daily report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getDailyReport(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.full_phone', 'reports.teacher_full_phone')
            qb.leftJoin('report_types', 'reports.report_type_id', 'report_types.id')
        });
    applyFilters(dbQuery, req.query.filters);
    const countQuery = dbQuery.clone().query()
        .countDistinct({ count: ['reports.teacher_full_phone', 'report_date', 'report_types.name'] })
        .then(res => res[0].count);
    dbQuery.query(qb => {
        qb.groupBy('reports.teacher_full_phone', 'teacher_tz', 'teacher_name', 'report_date', 'report_type_name')
        qb.select('teachers.tz as teacher_tz', 'teachers.name as teacher_name', 'report_date', 'report_types.name as report_type_name')
        qb.count({ student_count: 'reports.id' })
        qb.avg({ lesson_count: bookshelf.knex.raw("TIMESTAMPDIFF(MINUTE, STR_TO_DATE(enter_hour, '%H%i'), STR_TO_DATE(exit_hour, '%H%i')) / 45") })
    });
    fetchPage({ dbQuery, countQuery }, req.query, res);
}

/**
 * Get monthly report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getMonthlyReport(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('teachers', 'teachers.full_phone', 'reports.teacher_full_phone')
            qb.leftJoin('report_types', 'reports.report_type_id', 'report_types.id')
        });
    applyFilters(dbQuery, req.query.filters);
    const countQuery = dbQuery.clone().query()
        .countDistinct({ count: ['reports.teacher_full_phone', bookshelf.knex.raw("DATE_FORMAT(report_date, '%Y-%m')"), 'report_types.name'] })
        .then(res => res[0].count);
    dbQuery.query(qb => {
        qb.groupBy('reports.teacher_full_phone', 'teacher_tz', 'teacher_name', 'report_month', 'report_type_name')
        qb.select('teachers.tz as teacher_tz', 'teachers.name as teacher_name', { report_month: bookshelf.knex.raw("DATE_FORMAT(report_date, '%Y-%m')") }, 'report_types.name as report_type_name')
        qb.count({ student_count: 'reports.id' })
        qb.avg({ lesson_count: bookshelf.knex.raw("TIMESTAMPDIFF(MINUTE, STR_TO_DATE(enter_hour, '%H%i'), STR_TO_DATE(exit_hour, '%H%i')) / 45") })
    });
    fetchPage({ dbQuery, countQuery }, req.query, res);
}
