import * as reportKindergartenCtrl from '../controllers/reportKindergarten.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';

const router = genericRoute(reportKindergartenCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            reportKindergartenCtrl.getEditData(req, res);
        });
});

export default router;