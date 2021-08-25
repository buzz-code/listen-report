import express from 'express';
import * as reportKindergartenCtrl from '../controllers/reportKindergarten.controller';
import isAuthenticated from '../../common-modules/server/middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../../common-modules/server/utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        reportKindergartenCtrl.store(req, res);
    })
    .get((req, res) => {
        reportKindergartenCtrl.findAll(req, res);
    });

router.route('/get-edit-data')
    .get((req, res) => {
        reportKindergartenCtrl.getEditData(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        reportKindergartenCtrl.findById(req, res);
    })
    .put((req, res) => {
        reportKindergartenCtrl.update(req, res);
    })
    .delete((req, res) => {
        reportKindergartenCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        reportKindergartenCtrl.uploadMultiple(req, res);
    });

export default router;