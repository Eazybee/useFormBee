import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { validInputs, inValidInputs } from '../../test/fixtures/app';


afterEach(cleanup);

describe('App Component', () => {
  it('should render successfully', () => {
    const { container } = render(<App/>);

    expect(container).toBeTruthy();
  });

  it('should render <p data-test=username /> on wrong data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: inValidInputs.username } });

    expect(getByTestId('username')).toHaveTextContent('The user name field must contain only alphabetic characters.');
    expect(getByPlaceholderText('Username')).toHaveValue(inValidInputs.username);
  });

  it('should render <p data-test=username /> on empty data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: ' ' } });

    expect(getByTestId('username')).toHaveTextContent('The user name field cannot be empty.');
    expect(getByPlaceholderText('Username')).toHaveValue(' ');
  });

  it('should render <p data-test=age /> on wrong data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Age'), { target: { value: inValidInputs.age } });

    expect(getByTestId('age')).toHaveTextContent('The age must be a number.');
    expect(getByPlaceholderText('Age')).toHaveValue(inValidInputs.age);
  });

  it('should not render <p data-test=age /> on empty data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Age'), { target: { value: ' ' } });

    let element;

    try {
      element = getByTestId('age');
    } catch (error) {
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="age"]')).toBeTruthy();
    }
  });

  it('should remove error message upon data input correction', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: inValidInputs.username } });

    expect(getByTestId('username')).toHaveTextContent('The user name field must contain only alphabetic characters.');
    expect(getByPlaceholderText('Username')).toHaveValue(inValidInputs.username);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: ' ' } });

    expect(getByTestId('username')).toHaveTextContent('The user name field cannot be empty.');
    expect(getByPlaceholderText('Username')).toHaveValue(' ');

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: validInputs.username } });

    let element;

    try {
      element = getByTestId('username');
    } catch (error) {
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="username"]')).toBeTruthy();
    }

    expect(getByPlaceholderText('Username')).toHaveValue(validInputs.username);
  });

  describe('Submit Button', () => {
    it('should submit and render table on valid data input', () => {
      const {
        getByTestId, getByPlaceholderText, getByText,
      } = render(<App/>);

      fireEvent.change(getByPlaceholderText('Username'), { target: { value: validInputs.username } });
      fireEvent.change(getByPlaceholderText('Age'), { target: { value: validInputs.age } });
      fireEvent.click(getByText('Submit'));

      expect(getByTestId('table')).toBeTruthy();
      expect(getByTestId('table')).toContainElement(getByTestId('userName0'));
      expect(getByTestId('table')).toContainElement(getByTestId('age1'));
    });

    it('should not submit nor render table on invalid data input', () => {
      const {
        getByTestId, getByPlaceholderText, getByText,
      } = render(<App/>);

      fireEvent.change(getByPlaceholderText('Username'), { target: { value: inValidInputs.username } });
      fireEvent.change(getByPlaceholderText('Age'), { target: { value: validInputs.age } });
      fireEvent.click(getByText('Submit'));

      let element;

      try {
        element = getByTestId('table');
      } catch (error) {
        expect(element).toBe(undefined);
        expect(error).toBeTruthy();
        expect(error.message.includes('Unable to find an element by: [data-testid="table"]')).toBeTruthy();
        expect(getByTestId('username')).toHaveTextContent('The user name field must contain only alphabetic characters.');
      }
    });
  });

  describe('Reset Button', () => {
    it('should clear all inputs field', () => {
      const { getByText, getByPlaceholderText } = render(<App/>);
      fireEvent.change(getByPlaceholderText('Username'), { target: { value: validInputs.username } });
      fireEvent.change(getByPlaceholderText('Age'), { target: { value: validInputs.age } });
      fireEvent.click(getByText('Reset'));

      expect(getByPlaceholderText('Username')).toHaveValue('');
      expect(getByPlaceholderText('Age')).toHaveValue('');
    });

    it('should clear all error message', () => {
      const { getByText, getByTestId, getByPlaceholderText } = render(<App/>);
      fireEvent.change(getByPlaceholderText('Username'), { target: { value: inValidInputs.username } });
      fireEvent.click(getByText('Reset'));

      let element;

      try {
        element = getByTestId('username');
      } catch (error) {
        expect(element).toBe(undefined);
        expect(error).toBeTruthy();
        expect(error.message.includes('Unable to find an element by: [data-testid="username"]')).toBeTruthy();
      }
    });
  });
});
