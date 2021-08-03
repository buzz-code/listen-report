import React, { useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'teacher_full_phone', title: 'טלפון מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'lesson_number', title: 'מספר שיעור' },
  { field: 'count', title: 'מספר צופות' },
];

const TeacherReportsContainer = ({ entity, title }) => {
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

export default TeacherReportsContainer;
