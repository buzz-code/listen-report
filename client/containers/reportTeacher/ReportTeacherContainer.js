import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';

const getColumns = (lookups) => [
  { field: 'teacher_id', title: 'מורה', lookup: lookups.teachers },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'watching_students', title: 'תלמידות צופות', type: 'numeric' },
  { field: 'teaching_students', title: 'תלמידות מוסרות', type: 'numeric' },
];
const getFilters = () => [
  { field: 'teachers.name', label: 'מורה', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'watching_students', label: 'תלמידות צופות', type: 'text', operator: 'like' },
  { field: 'teaching_students', label: 'תלמידות מוסרות', type: 'text', operator: 'like' },
];

const getEditLookup = (data) =>
  data ? Object.fromEntries(data.map(({ id, name }) => [id, name])) : {};

const ReportTeacherContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  const editDataLists = useMemo(
    () => ({
      teachers: getEditLookup(editData && editData.teachers),
    }),
    [editData]
  );
  const columns = useMemo(() => getColumns(editDataLists), [editData]);
  const filters = useMemo(() => getFilters(), []);

  const manipulateDataToSave = (dataToSave) => ({
    ...dataToSave,
    report_date:
      dataToSave.report_date instanceof Date
        ? dataToSave.report_date.toISOString().substr(0, 10)
        : dataToSave.report_date.substr(0, 10),
    teacher_id: dataToSave.teacher_id === 'null' ? null : dataToSave.teacher_id,
  });

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      manipulateDataToSave={manipulateDataToSave}
    />
  );
};

export default ReportTeacherContainer;
