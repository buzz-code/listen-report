import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListIcon from '@material-ui/icons/List';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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

export default [
  [
    { path: '/dashboard', component: Dashboard, icon: DashboardIcon, title: 'לוח בקרה' },
    { path: '/reports', component: Reports, icon: ListAltIcon, title: 'צפיות' },
    { path: '/report-types', component: ReportTypes, icon: PeopleIcon, title: 'תלמידות' },
    { path: '/students', component: Students, icon: SupervisedUserCircleIcon, title: 'מורות' },
    { path: '/teachers', component: Teachers, icon: ListIcon, title: 'סוגי צפיה' },
    { path: '/texts', component: Texts, icon: ChatIcon, title: 'הודעות' },
  ],
  [{ path: '/excel-import', component: ExcelImport, icon: FileCopyIcon, title: 'העלאת קבצים' }],
  [
    {
      path: '/student-reports',
      component: StudentReports,
      icon: AssignmentIcon,
      title: 'דו"ח לתלמידה',
    },
    {
      path: '/teacher-reports',
      component: TeacherReports,
      icon: AssignmentIcon,
      title: 'דו"ח למורה',
    },
    {
      path: '/organization-reports',
      component: OrganizationReports,
      icon: AssignmentIcon,
      title: 'דו"ח לארגון צפיה',
    },
    {
      path: '/daily-reports',
      component: DailyReports,
      icon: AssignmentIcon,
      title: 'דו"ח שכר יומי',
    },
    {
      path: '/monthly-reports',
      component: MonthlyReports,
      icon: AssignmentIcon,
      title: 'דו"ח שכר חודשי',
    },
  ],
];
