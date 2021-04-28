import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [
  { field: 'name', title: 'שם', editable: 'onAdd' },
  { field: 'description', title: 'תיאור', editable: 'onAdd' },
  { field: 'value', title: 'ערך' },
];
const getFilters = () => [];

const TextsContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const filters = useMemo(() => getFilters(), []);
  const validateRow = useCallback((rowData) => {
    if (!rowData.name) {
      return 'חובה להזין שם';
    }
    if (!rowData.description) {
      return 'חובה להזין תיאור';
    }
    if (!rowData.value) {
      return 'חובה להזין ערך';
    }
    return null;
  }, []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      disableAdd={true}
      disableDelete={true}
      validateRow={validateRow}
    />
  );
};

export default TextsContainer;
