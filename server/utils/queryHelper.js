import moment from 'moment';
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import ReportType from "../models/reportType.model";
import User from "../models/user.model";
import KindergartenStudent from "../models/kindergartenStudent.model";
import Report from "../models/report.model";
import ReportTeacher from "../models/reportTeacher.model";
import ReportKindergarten from "../models/reportKindergarten.model";

export function getUserByPhone(phone_number) {
    return new User().where({ phone_number })
        .fetch()
        .then(res => res.toJSON());
}

export function getStudentAndTeacherByUserIdAndPhone(user_id, phone_number) {
    const student = new Student().where({ user_id, phone_number })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
    const teacher = new Teacher().where({ user_id, full_phone: phone_number })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
    return Promise.all([student, teacher]);
}

export function getKindergartenStudentByUserIdAndTz(user_id, tz) {
    return new KindergartenStudent().where({ user_id, tz })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getTeacherByUserIdAndLastDigits(user_id, lastDigits) {
    return new Teacher().where({ user_id })
        .where('full_phone', 'like', '%' + lastDigits)
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getReportTypeByUserId(userId) {
    return new ReportType().where({ user_id: userId })
        .fetchAll()
        .then(res => res.toJSON());
}

export async function getExistingStudentReport(student_id) {
    const query = new Report().where({ student_id, report_date: moment().format('YYYY-MM-DD') })
    try {
        await query.clone().fetchAll({ require: true });
        return query;
    }
    catch {
        return null;
    }
}

export async function getExistingTeacherReport(teacher_id, report_date) {
    const query = new ReportTeacher().where({ teacher_id, report_date })
    try {
        await query.clone().fetchAll({ require: true });
        return query;
    }
    catch {
        return null;
    }
}

export async function getExistingKindergartenStudentReport(student_id) {
    const query = new ReportKindergarten().where({ student_id, report_date: moment().format('YYYY-MM-DD') })
    try {
        await query.clone().fetchAll({ require: true });
        return query;
    }
    catch {
        return null;
    }
}

export function updateSalaryMonthByUserId(user_id, ids, salary_month) {
    return new ReportTeacher().query()
        .where({ user_id, salary_month: null })
        .whereIn('id', ids)
        .update({ salary_month });
}

export function updateSalaryCommentByUserId(user_id, id, comment) {
    return new ReportTeacher().query()
        .where({ user_id, id })
        .update({ comment });
}
