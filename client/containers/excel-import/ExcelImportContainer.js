import React from 'react';

import * as entities from '../../constants/entity';
import * as titles from '../../constants/entity-title';
import ExcelImport from '../../components/excel-import/ExcelImport';

const title = 'העלאת קובץ';
const supportedEntities = [
  {
    value: entities.STUDENTS,
    title: titles.STUDENTS,
    columns: ['tz', 'name', 'phone_number', 'klass', 'group'],
  },
  { value: entities.TEACHERS, title: titles.TEACHERS, columns: ['tz', 'name', 'full_phone'] },
];

const ExcelImportContainer = () => {
  return <ExcelImport title={title} supportedEntities={supportedEntities} />;
};

export default ExcelImportContainer;
