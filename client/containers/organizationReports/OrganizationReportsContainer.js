import React, { useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [
  { field: 'teacher_full_phone', title: 'טלפון מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'students', title: 'תלמידות' },
];

const OrganizationReportsContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
      disableFiltering={true}
    />
  );
};

export default OrganizationReportsContainer;
