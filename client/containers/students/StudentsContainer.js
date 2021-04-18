import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';
import { STUDENTS } from '../../constants/entity';

const getColumns = () => [
  { field: 'tz', title: 'תעודת זהות' },
  { field: 'name', title: 'שם' },
  { field: 'phone_number', title: 'מספר טלפון' },
  { field: 'klass', title: 'כיתה' },
  { field: 'group', title: 'התמחות' },
];

const StudentsContainer = () => {
  const title = 'תלמידות';
  const entity = STUDENTS;
  const columns = useMemo(() => getColumns(), []);
  const validateRow = useCallback((rowData) => {
    if (!rowData.tz) {
      return 'חובה להזין תעודת זהות';
    }
    if (!rowData.name) {
      return 'חובה להזין שם';
    }
    return null;
  }, []);

  return <Table entity={entity} title={title} columns={columns} validateRow={validateRow} />;
};

export default StudentsContainer;
