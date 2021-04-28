import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [{ field: 'name', title: 'סוג צפיה' }];
const getFilters = () => [];

const ReportTypesContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const filters = useMemo(() => getFilters(), []);
  const validateRow = useCallback((rowData) => {
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

export default ReportTypesContainer;
