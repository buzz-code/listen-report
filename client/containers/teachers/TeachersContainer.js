import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [
  { field: 'tz', title: 'תעודת זהות' },
  { field: 'name', title: 'שם' },
  { field: 'full_phone', title: 'מספר טלפון' },
];
const getFilters = () => [
  { field: 'tz', label: 'תעודת זהות', type: 'text', operator: 'like' },
  { field: 'name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'full_phone', label: 'מספר טלפון', type: 'text', operator: 'like' },
];

const TeachersContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const filters = useMemo(() => getFilters(), []);
  const validateRow = useCallback((rowData) => {
    if (!rowData.tz) {
      return 'חובה להזין תעודת זהות';
    }
    if (!rowData.name) {
      return 'חובה להזין שם';
    }
    return null;
  }, []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      validateRow={validateRow}
    />
  );
};

export default TeachersContainer;
