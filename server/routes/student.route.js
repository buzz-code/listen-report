import express from 'express';
import * as studentCtrl from '../controllers/student.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        studentCtrl.store(req, res);
    })
    .get((req, res) => {
        studentCtrl.findAll(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        studentCtrl.findById(req, res);
    })
    .put((req, res) => {
        studentCtrl.update(req, res);
    })
    .delete((req, res) => {
        studentCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        studentCtrl.uploadMultiple(req, res);
    });

export default router;