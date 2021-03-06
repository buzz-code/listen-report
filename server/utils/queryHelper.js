import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import ReportType from "../models/reportType.model";
import User from "../models/user.model";

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
