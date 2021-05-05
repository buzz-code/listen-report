import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import * as entities from './entity';
import * as titles from './entity-title';

import Dashboard from '../containers/dashboard/DashboardContainer';
import Reports from '../containers/reports/ReportsContainer';
import ReportTeacher from '../containers/reportTeacher/ReportTeacherContainer';
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

export default [
  [
    {
      path: '/dashboard',
      component: Dashboard,
      icon: DashboardIcon,
      title: titles.DASHBOARD,
      props: { entity: entities.DASHBOARD, title: titles.DASHBOARD },
    },
    {
      path: '/reports',
      component: Reports,
      icon: ListAltIcon,
      title: titles.REPORTS,
      props: { entity: entities.REPORTS, title: titles.REPORTS },
    },
    {
      path: '/report-teacher',
      component: ReportTeacher,
      icon: ListAltOutlinedIcon,
      title: titles.REPORT_TEACHER,
      props: { entity: entities.REPORT_TEACHER, title: titles.REPORT_TEACHER },
    },
    {
      path: '/students',
      component: Students,
      icon: PeopleIcon,
      title: titles.STUDENTS,
      props: { entity: entities.STUDENTS, title: titles.STUDENTS },
    },
    {
      path: '/teachers',
      component: Teachers,
      icon: SupervisedUserCircleIcon,
      title: titles.TEACHERS,
      props: { entity: entities.TEACHERS, title: titles.TEACHERS },
    },
    {
      path: '/report-types',
      component: ReportTypes,
      icon: ListIcon,
      title: titles.REPORT_TYPES,
      props: { entity: entities.REPORT_TYPES, title: titles.REPORT_TYPES },
    },
    {
      path: '/texts',
      component: Texts,
      icon: ChatIcon,
      title: titles.TEXTS,
      props: { entity: entities.TEXTS, title: titles.TEXTS },
    },
  ],
  [{ path: '/excel-import', component: ExcelImport, icon: FileCopyIcon, title: 'העלאת קבצים' }],
  [
    {
      path: '/student-reports',
      component: StudentReports,
      icon: AssignmentIcon,
      title: titles.STUDENT_REPORTS,
      props: { entity: entities.STUDENT_REPORTS, title: titles.STUDENT_REPORTS },
    },
    {
      path: '/teacher-reports',
      component: TeacherReports,
      icon: AssignmentIcon,
      title: titles.TEACHER_REPORTS,
      props: { entity: entities.TEACHER_REPORTS, title: titles.TEACHER_REPORTS },
    },
    {
      path: '/organization-reports',
      component: OrganizationReports,
      icon: AssignmentIcon,
      title: titles.ORGANIATION_REPORTS,
      props: { entity: entities.ORGANIATION_REPORTS, title: titles.ORGANIATION_REPORTS },
    },
    {
      path: '/daily-reports',
      component: DailyReports,
      icon: AssignmentIcon,
      title: titles.DAILY_REPORTS,
      props: { entity: entities.DAILY_REPORTS, title: titles.DAILY_REPORTS },
    },
    {
      path: '/monthly-reports',
      component: MonthlyReports,
      icon: AssignmentIcon,
      title: titles.MONTHLY_REPORTS,
      props: { entity: entities.MONTHLY_REPORTS, title: titles.MONTHLY_REPORTS },
    },
  ],
];
