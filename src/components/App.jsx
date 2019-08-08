import React, { useState } from 'react';
import '../styles/app.css';
import useForm from '../hooks/useForm';
import Table from './Table';
import SelectForm from './SelectForm';

const App = () => {
  const [submittedValues, setSubmittedValues] = useState({});
  const login = (values) => {
    setSubmittedValues(values);
  };

  const rules = {
    userName: 'alpha',
    age: 'numeric',
    gender: 'required|boolean',
  };

  const {
    values, handleChange, handleSubmit, errors, handleReset,
  } = useForm({ callback: login, rules });

  const { userName, age } = values;
  const {
    userName: usernameErr, age: ageErr, gender: genderErr,
  } = errors;

  const selectOptions = [
    {
      value: 'simi',
      text: 'SIMI',
    },
    {
      value: 'mosimi',
      text: 'MOSIMI',
    },
  ];

  return (
    <>
      <h1>Hello useFormBee!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value ={userName}
          onChange={handleChange}
          name='userName'
          required
          placeholder='Username'
        />
        {usernameErr && <p data-testid='username'>{usernameErr}</p>}
        <br />
        <input
          type='text'
          value ={age}
          onChange={handleChange}
          name='age'
          placeholder='Age'
        />
        {ageErr && <p data-testid='age'>{ageErr}</p>}
        <br />
        <label>
          Gender
          <input type='checkbox' name='gender' data-testid='confirm' required onChange={handleChange}/><br />
        </label>
        {genderErr && <p>{genderErr}</p>}
        <button type='submit'>Submit</button>
        <button type='reset' onClick={handleReset}>Reset</button>
      </form>
      {!Object.keys(errors).length
      && Object.keys(submittedValues).length > 0
      && <Table submittedValues={submittedValues} />}
      <SelectForm
        rules={{ friend: ['required', { in: ['simi', 'mosimi'] }] }}
        options={selectOptions}
      />
    </>
  );
};

export default App;
