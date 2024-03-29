import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ teachers }) => [
  {
    field: 'teacher_id',
    title: 'מורה',
    columnOrder: 'teachers.name',
    ...getPropsForAutoComplete('teacher_id', teachers),
  },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'update_date', title: 'תאריך עדכון', type: 'date', editable: 'never' },
  { field: 'lessons_number', title: 'מספר שיעורים', type: 'numeric' },
  { field: 'watching_students', title: 'תלמידות צופות', type: 'numeric' },
  { field: 'teaching_students', title: 'תלמידות מוסרות', type: 'numeric' },
  { field: 'was_telephone', title: 'דיון טלפוני', type: 'boolean' },
  { field: 'training_teacher', title: 'מורה מנחה', type: 'numeric' },
  { field: 'speciallity', title: 'התמחות', type: 'numeric' },
  { field: 'extra_question', title: 'שאלה נוספת' },
];
const getFilters = () => [
  { field: 'teachers.name', label: 'מורה', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'update_date', label: 'מתאריך עדכון', type: 'date', operator: 'date-before' },
  { field: 'update_date', label: 'עד תאריך עדכון', type: 'date', operator: 'date-after' },
  { field: 'watching_students', label: 'תלמידות צופות', type: 'text', operator: 'like' },
  { field: 'teaching_students', label: 'תלמידות מוסרות', type: 'text', operator: 'like' },
  { field: 'training_teacher', label: 'מורה מנחה', type: 'text', operator: 'like' },
  { field: 'speciallity', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'extra_question', label: 'שאלה נוספת', type: 'text', operator: 'like' },
];

const ReportTeacherContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  const columns = useMemo(() => getColumns(editData || {}), [editData]);
  const filters = useMemo(() => getFilters(), []);

  const manipulateDataToSave = (dataToSave) => ({
    ...dataToSave,
    report_date:
      dataToSave.report_date instanceof Date
        ? dataToSave.report_date.toISOString().substr(0, 10)
        : dataToSave.report_date.substr(0, 10),
    update_date:
      dataToSave.update_date instanceof Date
        ? dataToSave.update_date.toISOString().substr(0, 10)
        : dataToSave.update_date
        ? dataToSave.update_date.substr(0, 10)
        : undefined,
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
