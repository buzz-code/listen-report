import express from 'express';
import * as teacherCtrl from '../controllers/teacher.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        teacherCtrl.store(req, res);
    })
    .get((req, res) => {
        teacherCtrl.findAll(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        teacherCtrl.findById(req, res);
    })
    .put((req, res) => {
        teacherCtrl.update(req, res);
    })
    .delete((req, res) => {
        teacherCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        teacherCtrl.uploadMultiple(req, res);
    });

export default router;