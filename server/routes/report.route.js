import * as reportCtrl from '../controllers/report.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';
import { exportPdf } from '../../common-modules/server/utils/template';

const router = genericRoute(reportCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            reportCtrl.getEditData(req, res);
        });

    router.route('/getStudentReport')
        .get((req, res) => {
            reportCtrl.getStudentReport(req, res);
        });

    router.route('/getTeacherReport')
        .get((req, res) => {
            reportCtrl.getTeacherReport(req, res);
        });

    router.route('/getOrganizationReport')
        .get((req, res) => {
            reportCtrl.getOrganizationReport(req, res);
        });

    router.route('/getDailyReport')
        .get((req, res) => {
            reportCtrl.getDailyReport(req, res);
        });

    router.route('/getMonthlyReport')
        .get((req, res) => {
            reportCtrl.getMonthlyReport(req, res);
        });
 
    router.route('/:reportId/export-pdf')
        .post((req, res) => {
            exportPdf(req, res);
        });
});

export default router;