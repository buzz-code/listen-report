import express from 'express';
import * as reportTeacherCtrl from '../controllers/reportTeacher.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        reportTeacherCtrl.store(req, res);
    })
    .get((req, res) => {
        reportTeacherCtrl.findAll(req, res);
    });

router.route('/get-edit-data')
    .get((req, res) => {
        reportTeacherCtrl.getEditData(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        reportTeacherCtrl.findById(req, res);
    })
    .put((req, res) => {
        reportTeacherCtrl.update(req, res);
    })
    .delete((req, res) => {
        reportTeacherCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        reportTeacherCtrl.uploadMultiple(req, res);
    });

export default router;