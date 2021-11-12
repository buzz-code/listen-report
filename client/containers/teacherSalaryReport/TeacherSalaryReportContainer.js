import React, { useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'teacher_tz', title: 'תז מורה' },
  { field: 'teacher_name', title: 'שם', defaultSort: 'asc' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'lessons_number', title: 'מספר שיעורים', type: 'numeric' },
  { field: 'watching_students', title: 'תלמידות צופות', type: 'numeric' },
  { field: 'teaching_students', title: 'תלמידות מוסרות', type: 'numeric' },
  { field: 'was_telephone', title: 'דיון טלפוני', type: 'boolean' },
  { field: 'training_teacher', title: 'מורה מנחה', type: 'numeric' },
  { field: 'speciallity', title: 'התמחות', type: 'numeric' },
  { field: 'teacher_type_name', title: 'סוג מורה' },
  { field: 'teacher_salary', title: 'שכר' },
];

const getFilters = () => [
  { field: 'teachers.name', label: 'שם מורה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'speciallity', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'training_teacher', label: 'מורה מנחה', type: 'text', operator: 'like' },
  { field: 'teacher_types.name', label: 'סוג מורה', type: 'text', operator: 'like' },
];

const TeacherSalaryReportContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const filters = useMemo(() => getFilters(), []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
    />
  );
};

export default TeacherSalaryReportContainer;
