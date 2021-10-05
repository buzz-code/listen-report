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
    return new User({ phone_number })
        .fetch()
        .then(res => res.toJSON());
}

export function getStudentAndTeacherByUserIdAndPhone(user_id, phone_number) {
    const student = new Student({ user_id, phone_number })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
    const teacher = new Teacher({ user_id, full_phone: phone_number })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
    return Promise.all([student, teacher]);
}

export function getKindergartenStudentByUserIdAndTz(user_id, tz) {
    return new KindergartenStudent({ user_id, tz })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getTeacherByUserIdAndLastDigits(user_id, lastDigits) {
    return new Teacher({ user_id })
        .where('full_phone', 'like', '%' + lastDigits)
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getReportTypeByUserId(userId) {
    return new ReportType({ user_id: userId })
        .fetchAll()
        .then(res => res.toJSON());
}

export function getExistingStudentReport(student_id) {
    return new Report({ student_id, report_date: moment().format('YYYY-MM-DD') })
        .fetchAll();
}

export function getExistingTeacherReport(teacher_id) {
    return new ReportTeacher({ teacher_id, report_date: moment().format('YYYY-MM-DD') })
        .fetchAll();
}

export function getExistingKindergartenStudentReport(student_id) {
    return new ReportKindergarten({ student_id, report_date: moment().format('YYYY-MM-DD') })
        .fetchAll();
}
