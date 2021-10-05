import React, { useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'teacher_tz', title: 'תז מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'lessons_number', title: 'מספר שיעורים', type: 'numeric' },
  { field: 'watching_students', title: 'תלמידות צופות', type: 'numeric' },
  { field: 'teaching_students', title: 'תלמידות מוסרות', type: 'numeric' },
  { field: 'was_telephone', title: 'דיון טלפוני', type: 'boolean' },
  { field: 'teacher_salary', title: 'שכר' },
];

const TeacherSalaryReportContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
    />
  );
};

export default TeacherSalaryReportContainer;
