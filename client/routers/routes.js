import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import custom components
import PrivateRoute from './PrivateRoute';
import RestrictRoute from './RestrictRoute';
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';

import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import Dashboard from '../containers/dashboard/DashboardContainer';
import Reports from '../containers/reports/ReportsContainer';
import ReportTypes from '../containers/reportTypes/ReportTypesContainer';
import Students from '../containers/students/StudentsContainer';
import Teachers from '../containers/teachers/TeachersContainer';
import Texts from '../containers/texts/TextsContainer';
import ExcelImport from '../containers/excel-import/ExcelImportContainer';
import StudentReports from '../containers/studentReports/StudentReportsContainer';
import TeacherReports from '../containers/teacherReports/TeacherReportsContainer';
import OrganizationReports from '../containers/organizationReports/OrganizationReportsContainer';
import DailyReports from '../containers/dailyReports/DailyReportsContainer';
import MonthlyReports from '../containers/monthlyReports/MonthlyReportsContainer';

const Router = () => (
  <Fragment>
    <Switch>
      <RestrictRoute exact path="/" component={LoginForm} />
      <RestrictRoute exact path="/signup" component={SignUpForm} />

      <PrivateRoute exact path="/dashboard" layout={MainLayout} component={Dashboard} />
      <PrivateRoute exact path="/reports" layout={MainLayout} component={Reports} />
      <PrivateRoute exact path="/report-types" layout={MainLayout} component={ReportTypes} />
      <PrivateRoute exact path="/students" layout={MainLayout} component={Students} />
      <PrivateRoute exact path="/teachers" layout={MainLayout} component={Teachers} />
      <PrivateRoute exact path="/texts" layout={MainLayout} component={Texts} />

      <PrivateRoute exact path="/excel-import" layout={MainLayout} component={ExcelImport} />

      <PrivateRoute exact path="/student-reports" layout={MainLayout} component={StudentReports} />
      <PrivateRoute exact path="/teacher-reports" layout={MainLayout} component={TeacherReports} />
      <PrivateRoute
        exact
        path="/organization-reports"
        layout={MainLayout}
        component={OrganizationReports}
      />
      <PrivateRoute exact path="/daily-reports" layout={MainLayout} component={DailyReports} />
      <PrivateRoute exact path="/monthly-reports" layout={MainLayout} component={MonthlyReports} />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
