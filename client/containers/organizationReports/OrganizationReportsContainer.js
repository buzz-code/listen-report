import React, { useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'teacher_full_phone', title: 'טלפון מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'students', title: 'תלמידות' },
];
const getFilters = () => [
  { field: 'teachers.full_phone', label: 'טלפון מורה', type: 'text', operator: 'like' },
  { field: 'teachers.name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'students.name', label: 'תלמידות', type: 'text', operator: 'like' },
  { field: 'students.group', label: 'התמחות', type: 'text', operator: 'like' },
];

const OrganizationReportsContainer = ({ entity, title }) => {
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

export default OrganizationReportsContainer;
