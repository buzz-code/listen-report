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

    router.route('/:reportId/export-pdf')
        .post((req, res) => {
            exportPdf(req, res);
        });
});


export default router;