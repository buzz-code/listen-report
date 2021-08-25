import express from 'express';
import * as kindergartenStudentCtrl from '../controllers/kindergartenStudent.controller';
import isAuthenticated from '../../common-modules/server/middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../../common-modules/server/utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        kindergartenStudentCtrl.store(req, res);
    })
    .get((req, res) => {
        kindergartenStudentCtrl.findAll(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        kindergartenStudentCtrl.findById(req, res);
    })
    .put((req, res) => {
        kindergartenStudentCtrl.update(req, res);
    })
    .delete((req, res) => {
        kindergartenStudentCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        kindergartenStudentCtrl.uploadMultiple(req, res);
    });

export default router;