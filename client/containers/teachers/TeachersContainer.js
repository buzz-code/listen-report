import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';
import { TEACHERS as entity } from '../../constants/entity';
import { TEACHERS as title } from '../../constants/entity-title';

const getColumns = () => [
  { field: 'tz', title: 'תעודת זהות' },
  { field: 'name', title: 'שם' },
  { field: 'full_phone', title: 'מספר טלפון' },
];

const TeachersContainer = () => {
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

export default TeachersContainer;
