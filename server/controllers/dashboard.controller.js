import Report from '../models/report.model';
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';

/**
 * Get stats
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getStats(req, res) {
    const [reports, students, teachers] = await Promise.all([
        getCountFromTable(Report, req.currentUser.id),
        getCountFromTable(Student, req.currentUser.id),
        getCountFromTable(Teacher, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { reports, students, teachers }
    });
}

function getCountFromTable(table, user_id) {
    return new table({ user_id })
        .count();
}
