import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Table from './Table';
import useForm from '../hooks/useForm';

const SelectForm = ({ rules, options, ...rest }) => {
  const [submittedValues, setSubmittedValues] = useState({});
  const login = (values) => {
    setSubmittedValues(values);
  };

  const {
    values, handleChange, handleSubmit, handleReset, errors,
  } = useForm({ callback: login, rules });

  return (
    <>
      <h1>Multiple Select!</h1>
      <form onSubmit={handleSubmit}>
        <select
            onChange={handleChange}
            name='friend'
            multiple
            data-testid='friend'
            value={values.friend || []}
            {...rest}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={option.value}
                data-testid={option.value}
              >
                {option.text}
              </option>
            ))}
          </select>
          <br />
          <button type='submit'>Submit</button>
          <button type='reset' onClick={handleReset}>Reset</button>
          {errors.friend && <p data-testid='selectionError'>{errors.friend}</p>}<br />
          {!Object.keys(errors).length
          && Object.keys(submittedValues).length > 0
          && <Table submittedValues={submittedValues} />}
      </form>
    </>
  );
};

SelectForm.propTypes = {
  rules: Proptypes.object.isRequired,
  options: Proptypes.arrayOf(Proptypes.shape({
    value: Proptypes.string.isRequired,
    text: Proptypes.string.isRequired,
  })),
};

export default SelectForm;
