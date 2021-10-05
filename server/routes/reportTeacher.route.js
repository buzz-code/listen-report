import * as reportTeacherCtrl from '../controllers/reportTeacher.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';

const router = genericRoute(reportTeacherCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            reportTeacherCtrl.getEditData(req, res);
        });

    router.route('/getTeacherSalaryReport')
        .get((req, res) => {
            reportTeacherCtrl.getTeacherSalaryReport(req, res);
        });
});


export default router;