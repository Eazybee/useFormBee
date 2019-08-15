import { useState } from 'react';
import Validator from 'validatorjs';
import formatter from '../helpers/formatter';

const useForm = ({ callback, rules }) => {
  const initialState = () => {
    const state = {};
    Object.keys(rules).forEach((key) => { state[key] = ''; });
    return state;
  };

  const [values, setValues] = useState(initialState());
  const [errors, setErrors] = useState({});

  Validator.setAttributeFormatter(attribute => formatter(attribute));

  const validateOnSubmit = () => {
    let hasError = true;
    const newErrors = { ...errors };

    Object.keys(rules).forEach((key) => {
      const validate = (name, value) => {
        const validation = new Validator(
          { [name]: value },
          { [name]: rules[name] },
        );

        const errorMessage = validation.fails() && validation.errors.first(name);

        if (errorMessage) {
          newErrors[name] = errorMessage;
          hasError = false;
        } else {
          delete newErrors[name];
        }
      };

      if (Array.isArray(values[key])) {
        values[key].forEach(value => validate(key, value));
      } else {
        validate(key, values[key]);
      }
    });

    setErrors({ ...newErrors });
    return hasError;
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
    const { target } = event;
    const { required, name, type } = target;
    let { value } = target;

    if (type === 'checkbox') {
      value = target.checked;
      if (required && !value) {
        return errorHandler(name, value, `The ${formatter(name)} must be accepted.`);
      }
    } else if (required && value.trim() === '') {
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

  const getMultipleSelection = (event) => {
    const { options } = event.target;
    const selected = Object.entries(options).filter(([, option]) => option.selected);
    const value = selected.map(([, option]) => option.value);
    return value;
  };

  const handleChange = (event) => {
    const { target } = event;
    if (validateOnChange(event)) {
      let { value } = target;

      if (target.type === 'select-multiple') {
        value = getMultipleSelection(event);
      }
      if (target.type === 'checkbox') {
        value = target.checked;
      }

      setValues({
        ...values,
        [target.name]: value,
      });

      delete errors[target.name];
      setErrors({ ...errors });
      return true;
    }
    return false;
  };

  const sanitizeData = () => {
    const data = {};
    Object.keys(values).forEach((field) => {
      if (Array.isArray(values[field])) {
        data[field] = values[field].map(value => value.trim());
      } else if (typeof values[field] === 'boolean') {
        data[field] = values[field];
      } else {
        data[field] = values[field].trim();
      }
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
    setValues(initialState());
    setErrors({});
  };

  return {
    values, handleChange, handleSubmit, errors, handleReset,
  };
};

export default useForm;
