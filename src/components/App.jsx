import React, { useState } from 'react';
import '../styles/app.css';
import useFormBee from '../hooks/useFormBee';
import Table from './Table';

const App = () => {
  const [submittedValues, setSubmittedValues] = useState({});
  const login = (values) => {
    setSubmittedValues(values);
  };

  const rules = {
    userName: 'alpha',
    age: 'numeric',
    gender: 'required|boolean',
    friend: ['required', { in: ['mosimi', 'benny'] }],
  };

  const {
    values, handleChange, handleSubmit, errors, handleReset,
  } = useFormBee({ callback: login, rules });

  const { userName, age } = values;
  const {
    userName: usernameErr,
    age: ageErr,
    gender: genderErr,
    friend: friendErr,
  } = errors;

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
        <br />
        <select onChange={handleChange} name='friend' multiple data-testid='friend' >
          <option value='mosimi' data-testid='mosimi'>Mosimiloluwa</option>
          <option value='benny' data-testid='benny'>Benny</option>
        </select>
        {friendErr && <p data-testid='selectionError'>{friendErr}</p>}
        <br />
        <button type='submit'>Submit</button>
        <button type='reset' onClick={handleReset}>Reset</button>
      </form>
      {!Object.keys(errors).length
      && Object.keys(submittedValues).length > 0
      && <Table submittedValues={submittedValues} />}
    </>
  );
};

export default App;
