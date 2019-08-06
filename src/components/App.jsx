import React, { useState } from 'react';
import '../styles/app.css';
import useForm from '../hooks/useForm';

const App = () => {
  const [submittedValues, setSubmittedValues] = useState('');
  const login = (values) => {
    setSubmittedValues(values);
  };

  const rules = {
    userName: 'alpha',
    age: 'numeric',
  };

  const {
    values, handleChange, handleSubmit, errors,
  } = useForm({ callback: login, rules });

  const { userName, age } = values;
  const {
    userName: usernameErr, age: ageErr,
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
        <button type='submit'>Submit</button>
      </form>
      {submittedValues
      && <div className='table' data-testid='table'>
        {Object.keys(submittedValues).map((key, index) => (
          <p key={index} data-testid={key + index}>
            <span>{key} :</span>
            <span>{submittedValues[key]}</span>
          </p>
        ))}
      </div>}
    </>
  );
};

export default App;
