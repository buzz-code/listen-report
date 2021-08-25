import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

// Import custom components
import authReducer from '../../common-modules/client/reducers/authReducer';
import crudReducer from '../../common-modules/client/reducers/crudReducer';
import {
  REPORTS,
  REPORT_TEACHER,
  REPORT_KINDERGARTEN,
  REPORT_TYPES,
  STUDENTS,
  TEACHERS,
  KINDERGARTEN_STUDENTS,
  TEXTS,
  STUDENT_REPORTS,
  TEACHER_REPORTS,
  ORGANIATION_REPORTS,
  DAILY_REPORTS,
  MONTHLY_REPORTS,
  DASHBOARD,
} from '../constants/entity';

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer, // ← redux-form
    auth: authReducer,
    [REPORTS]: crudReducer(REPORTS),
    [REPORT_TEACHER]: crudReducer(REPORT_TEACHER),
    [REPORT_KINDERGARTEN]: crudReducer(REPORT_KINDERGARTEN),
    [REPORT_TYPES]: crudReducer(REPORT_TYPES),
    [STUDENTS]: crudReducer(STUDENTS),
    [TEACHERS]: crudReducer(TEACHERS),
    [KINDERGARTEN_STUDENTS]: crudReducer(KINDERGARTEN_STUDENTS),
    [TEXTS]: crudReducer(TEXTS),
    [STUDENT_REPORTS]: crudReducer(STUDENT_REPORTS),
    [TEACHER_REPORTS]: crudReducer(TEACHER_REPORTS),
    [ORGANIATION_REPORTS]: crudReducer(ORGANIATION_REPORTS),
    [DAILY_REPORTS]: crudReducer(DAILY_REPORTS),
    [MONTHLY_REPORTS]: crudReducer(MONTHLY_REPORTS),
    [DASHBOARD]: crudReducer(DASHBOARD),
  });

const rootReducer = (state, action) => {
  if (action === 'LOG_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
