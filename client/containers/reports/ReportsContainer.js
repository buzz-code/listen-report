import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';

const getColumns = (lookups) => [
  { field: 'student_id', title: 'תלמידה', lookup: lookups.students },
  { field: 'student_group', title: 'התמחות', editable: 'never' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'teacher_id', title: 'מורה', lookup: lookups.teachers },
  { field: 'teacher_full_phone', title: 'טלפון מורה' },
  { field: 'lesson_number', title: 'מספר שיעור' },
  { field: 'other_students', title: 'תלמידות נוספות' },
  { field: 'report_type_id', title: 'סוג דיווח', lookup: lookups.reportTypes },
];
const getFilters = () => [
  { field: 'students.name', label: 'תלמידה', type: 'text', operator: 'like' },
  { field: 'students.group', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'teachers.name', label: 'מורה', type: 'text', operator: 'like' },
  { field: 'teacher_full_phone', label: 'טלפון מורה', type: 'text', operator: 'like' },
  { field: 'lesson_number', label: 'מספר שיעור', type: 'text', operator: 'like' },
  { field: 'report_types.name', label: 'סוג דיווח', type: 'text', operator: 'like' },
];

const getEditLookup = (data) =>
  data ? Object.fromEntries(data.map(({ id, name }) => [id, name])) : {};

const ReportsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  const editDataLists = useMemo(
    () => ({
      students: getEditLookup(editData && editData.students),
      teachers: { ...getEditLookup(editData && editData.teachers), null: 'לא נבחר' },
      reportTypes: getEditLookup(editData && editData.reportTypes),
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
    student_group: undefined,
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

export default ReportsContainer;
