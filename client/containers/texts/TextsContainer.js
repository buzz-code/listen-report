import React, { useCallback, useMemo } from 'react';

import Table from '../../components/table/Table';
import { TEXTS } from '../../constants/entity';

const getColumns = () => [
  { field: 'name', title: 'שם', editable: 'onAdd' },
  { field: 'description', title: 'תיאור', editable: 'onAdd' },
  { field: 'value', title: 'ערך' },
];

const TextsContainer = () => {
  const title = 'הודעות';
  const entity = TEXTS;
  const columns = useMemo(() => getColumns(), []);
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
      disableAdd={true}
      disableDelete={true}
      validateRow={validateRow}
    />
  );
};

export default TextsContainer;
