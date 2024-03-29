import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';

const getColumns = (handleEditComment) => [
  { field: 'teacher_tz', title: 'תז מורה' },
  { field: 'teacher_name', title: 'שם', defaultSort: 'asc' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'update_date', title: 'תאריך עדכון', type: 'date' },
  { field: 'lessons_number', title: 'מספר שיעורים', type: 'numeric' },
  { field: 'watching_students', title: 'תלמידות צופות', type: 'numeric' },
  { field: 'teaching_students', title: 'תלמידות מוסרות', type: 'numeric' },
  { field: 'was_telephone', title: 'דיון טלפוני', type: 'boolean' },
  { field: 'training_teacher', title: 'מורה מנחה', type: 'numeric' },
  { field: 'speciallity', title: 'התמחות', type: 'numeric' },
  { field: 'teacher_type_name', title: 'סוג מורה' },
  { field: 'teacher_salary', title: 'שכר' },
  {
    field: 'salary_month',
    title: 'חודש שכר',
    type: 'date',
    render: ({ salary_month }) => (salary_month ? moment(salary_month).format('MM-yyyy') : ''),
  },
  {
    field: 'comment',
    title: 'הערה לשכר',
    render: (rowData) => (
      <>
        <EditIcon onClick={() => handleEditComment(rowData)} />
        {rowData.comment}
      </>
    ),
  },
];

const getFilters = () => [
  { field: 'teachers.name', label: 'שם מורה', type: 'text', operator: 'like' },
  { field: 'speciallity', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'training_teacher', label: 'מורה מנחה', type: 'text', operator: 'like' },
  { field: 'teacher_types.name', label: 'סוג מורה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
  { field: 'salary_month', label: 'חודש שכר', type: 'date', operator: null },
  { field: 'update_date', label: 'מתאריך עדכון', type: 'date', operator: 'date-before' },
  { field: 'update_date', label: 'עד תאריך עדכון', type: 'date', operator: 'date-after' },
];
const getActions = (handleUpdateSalaryMonth) => [
  {
    icon: 'fact_check',
    tooltip: 'עדכן חודש שכר',
    isFreeAction: true,
    onClick: handleUpdateSalaryMonth,
  },
];

const TeacherSalaryReportContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    data,
    POST: { '../updateSalaryMonth': updateSalaryMonth },
  } = useSelector((state) => state[entity]);

  const [refreshButton, setRefreshButton] = useState(null);
  const [conditions, setConditions] = useState({});

  useEffect(() => {
    if (updateSalaryMonth && refreshButton) {
      refreshButton.click();
    }
  }, [updateSalaryMonth]);

  const handleUpdateSalaryMonth = useCallback(
    (e) => {
      const refreshButton = e.currentTarget.previousElementSibling;
      setRefreshButton(refreshButton);

      const ids = data ? data.map((item) => item.id) : [];
      const salaryMonth = conditions[6]?.value;

      if (!ids.length || !salaryMonth) {
        alert('לא ניתן לעדכן חודש שכר אם אין נתונים או לא נבחר חודש');
        return;
      }

      dispatch(
        crudAction.customHttpRequest(entity, 'POST', '../updateSalaryMonth', { ids, salaryMonth })
      );
    },
    [entity, data, conditions]
  );
  const handleEditComment = useCallback(
    (rowData) => {
      const comment = prompt('הקלידי הערה', rowData.comment || '');
      if (comment === null) {
        return;
      }

      rowData.comment = comment;
      dispatch(
        crudAction.customHttpRequest(entity, 'POST', '../updateSalaryComment', {
          id: rowData.id,
          comment,
        })
      );
    },
    [entity]
  );

  const columns = useMemo(() => getColumns(handleEditComment), [handleEditComment]);
  const filters = useMemo(() => getFilters(), []);
  const actions = useMemo(() => getActions(handleUpdateSalaryMonth), [handleUpdateSalaryMonth]);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      additionalActions={actions}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
      onConditionUpdate={setConditions}
    />
  );
};

export default TeacherSalaryReportContainer;
