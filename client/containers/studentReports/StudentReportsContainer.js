import React, { useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [
  { field: 'student_tz', title: 'תעודת זהות' },
  { field: 'student_name', title: 'שם' },
  { field: 'student_group', title: 'התמחות' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'count', title: 'מספר שיעורים' },
];
const getFilters = () => [
  { field: 'students.tz', label: 'תעודת זהות', type: 'text', operator: 'like' },
  { field: 'students.name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'students.group', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
];

const StudentReportsContainer = ({ entity, title }) => {
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

export default StudentReportsContainer;
