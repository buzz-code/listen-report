import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';

const getColumns = () => [{ field: 'name', title: 'סוג צפיה' }];

const ReportTypesContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const validateRow = useCallback((rowData) => {
    if (!rowData.name) {
      return 'חובה להזין שם';
    }
    return null;
  }, []);

  return <Table entity={entity} title={title} columns={columns} validateRow={validateRow} />;
};

export default ReportTypesContainer;
