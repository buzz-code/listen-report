import * as reportTeacherCtrl from '../controllers/reportTeacher.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';
import { exportPdf } from '../../common-modules/server/utils/template';

const router = genericRoute(reportTeacherCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            reportTeacherCtrl.getEditData(req, res);
        });

    router.route('/getTeacherSalaryReport')
        .get((req, res) => {
            reportTeacherCtrl.getTeacherSalaryReport(req, res);
        });

    router.route('/getTeacherSalarySummaryReport')
        .get((req, res) => {
            reportTeacherCtrl.getTeacherSalarySummaryReport(req, res);
        });

    router.route('/:reportId/export-pdf')
        .post((req, res) => {
            exportPdf(req, res);
        });

    router.route('/updateSalaryMonth')
        .post((req, res) => {
            reportTeacherCtrl.updateSalaryMonth(req, res);
        });

    router.route('/updateSalaryComment')
        .post((req, res) => {
            reportTeacherCtrl.updateSalaryComment(req, res);
        });
});


export default router;