import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';
import { REPORT_TYPES } from '../../constants/entity';

const getColumns = () => [{ field: 'name', title: 'סוג צפיה' }];

const ReportTypesContainer = () => {
  const title = 'סוגי צפיה';
  const entity = REPORT_TYPES;
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
