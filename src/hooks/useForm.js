import { useState } from 'react';
import Validator from 'validatorjs';
import formatter from '../helpers/formatter';

const useForm = ({ callback, rules }) => {
  const prepareInitialState = () => {
    const state = {};
    Object.keys(rules).forEach((key) => { state[key] = ''; });
    return state;
  };

  const [values, setValues] = useState(prepareInitialState());
  const [errors, setErrors] = useState({});

  Validator.setAttributeFormatter(attribute => formatter(attribute));

  const validateOnSubmit = () => {
    let errorDoesNoExist = true;
    const newErrors = { ...errors };

    Object.keys(rules).forEach((key) => {
      const validation = new Validator(
        { [key]: values[key] },
        { [key]: rules[key] },
      );

      const errorMessage = validation.fails() && validation.errors.first(key);

      if (errorMessage) {
        newErrors[key] = errorMessage;
        errorDoesNoExist = false;
      } else {
        delete newErrors[key];
      }
    });

    setErrors({ ...newErrors });
    return errorDoesNoExist;
  };

  const errorHandler = (name, value, message) => {
    setErrors({
      ...errors,
      [name]: message,
    });
    setValues({
      ...values,
      [name]: value,
    });

    return false;
  };

  const validateOnChange = (event) => {
    const {
      target: {
        required, value, name,
      },
    } = event;

    if (required && value.trim() === '') {
      return errorHandler(name, value, `The ${formatter(name)} field cannot be empty.`);
    }

    const validation = new Validator(
      { [name]: value },
      { [name]: rules[name] },
    );

    if (validation.fails()) {
      return errorHandler(name, value, validation.errors.first(name));
    }

    return true;
  };

  const handleChange = (event) => {
    if (validateOnChange(event)) {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });

      delete errors[event.target.name];
      setErrors({ ...errors });
    }
  };

  const sanitizeData = () => {
    const data = {};
    Object.keys(values).forEach((key) => {
      data[key] = values[key].trim();
    });
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateOnSubmit()) {
      const data = sanitizeData();
      return callback(data);
    }

    return false;
  };

  const handleReset = () => {
    setValues(prepareInitialState());
    setErrors({});
  };

  return {
    values, handleChange, handleSubmit, errors, handleReset,
  };
};

export default useForm;
