import React from 'react';

import * as entities from '../../constants/entity';
import * as titles from '../../constants/entity-title';
import ExcelImport from '../../../common-modules/client/components/excel-import/ExcelImport';

const title = 'העלאת קובץ';
const supportedEntities = [
  {
    value: entities.STUDENTS,
    title: titles.STUDENTS,
    columns: ['tz', 'name', 'phone_number', 'klass', 'group'],
  },
  { value: entities.TEACHERS, title: titles.TEACHERS, columns: ['tz', 'name', 'full_phone'] },
  {
    value: entities.KINDERGARTEN_STUDENTS,
    title: titles.KINDERGARTEN_STUDENTS,
    columns: ['tz', 'name', 'klass', 'group'],
  },
];

const ExcelImportContainer = () => {
  return <ExcelImport title={title} supportedEntities={supportedEntities} />;
};

export default ExcelImportContainer;
