import React, { useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [
  { field: 'teacher_tz', title: 'תז מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'report_month', title: 'חודש' },
  { field: 'lesson_count', title: 'מספר שיעורים' },
  { field: 'student_count', title: 'מספר צפיות' },
  { field: 'report_type_name', title: 'סוג שיעור' },
];

const MonthlyReportsContainer = ({ entity, title }) => {
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

export default MonthlyReportsContainer;
