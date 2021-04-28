import React, { useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  inputField: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
  },
}));

const TableFilter = ({ filters, onFilterChange }) => {
  const classes = useStyles();
  const [conditions, setConditions] = useState({});

  const onChange = (filter, index) => {
    const newConditions = { ...conditions, [index]: filter };
    setConditions(newConditions);
  };

  const onFilterFire = () => {
    onFilterChange(conditions);
  };

  return (
    <Paper className={classes.container}>
      <div>
        {filters.map((item, index) => (
          <FilterItem item={item} index={index} key={index} onChange={onChange} classes={classes} />
        ))}
      </div>

      <div className={classes.buttonContainer}>
        <div style={{ flex: '1' }}> </div>
        <Button variant="contained" color="primary" onClick={onFilterFire}>
          סנן נתונים
        </Button>
      </div>
    </Paper>
  );
};

const FilterItem = ({ item, index, onChange, classes }) => {
  const inputRef = useRef();
  const handleChange = () => {
    const filter = {
      field: item.field,
      value: inputRef.current.value,
      operator: item.operator,
    };
    onChange(filter, index);
  };

  return item.type === 'text' || item.type === 'date' ? (
    <TextField
      className={classes.inputField}
      type={item.type}
      label={item.label}
      inputRef={inputRef}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  ) : null;
};

export default TableFilter;
