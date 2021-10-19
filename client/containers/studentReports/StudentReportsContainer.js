import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ reportTypes }) => [
  { field: 'student_tz', title: 'תעודת זהות' },
  { field: 'student_name', title: 'שם' },
  { field: 'student_group', title: 'התמחות' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'lesson_number', title: 'מספר שיעור' },
  { field: 'other_students', title: 'תלמידות נוספות' },
  {
    field: 'report_type_id',
    title: 'סוג דיווח',
    columnOrder: 'report_type_id',
    ...getPropsForAutoComplete('report_type_id', reportTypes),
  },
];
const getFilters = () => [
  { field: 'students.tz', label: 'תעודת זהות', type: 'text', operator: 'like' },
  { field: 'students.name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'students.group', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
];

const StudentReportsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { '../get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', '../get-edit-data'));
  }, []);

  const columns = useMemo(() => getColumns(editData || {}), [editData]);
  const filters = useMemo(() => getFilters(), []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
    />
  );
};

export default StudentReportsContainer;
