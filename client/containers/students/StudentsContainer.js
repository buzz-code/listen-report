import React, { useCallback, useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'tz', title: 'תעודת זהות' },
  { field: 'name', title: 'שם' },
  { field: 'phone_number', title: 'מספר טלפון' },
  { field: 'klass', title: 'כיתה' },
  { field: 'group', title: 'התמחות' },
];
const getFilters = () => [
  { field: 'tz', label: 'תעודת זהות', type: 'text', operator: 'like' },
  { field: 'name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'phone_number', label: 'מספר טלפון', type: 'text', operator: 'like' },
  { field: 'klass', label: 'כיתה', type: 'text', operator: 'like' },
  { field: 'group', label: 'התמחות', type: 'text', operator: 'like' },
];

const StudentsContainer = ({ entity, title }) => {
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

export default StudentsContainer;
