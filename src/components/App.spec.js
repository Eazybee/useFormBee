import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


afterEach(cleanup);

describe('App Component', () => {
  it('should render successfully', () => {
    const { container } = render(<App/>);

    expect(container).toBeTruthy();
  });

  it('should render <p data-test=username /> on wrong data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'abc@de123com' } });

    expect(getByTestId('username')).toHaveTextContent('The userName field must contain only alphabetic characters.');
    expect(getByPlaceholderText('Username')).toHaveValue('abc@de123com');
  });

  it('should render <p data-test=username /> on empty data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: ' ' } });

    expect(getByTestId('username')).toHaveTextContent('The userName field cannot be empty.');
    expect(getByPlaceholderText('Username')).toHaveValue(' ');
  });

  it('should render <p data-test=age /> on wrong data input', () => {
    const { getByTestId, getByPlaceholderText } = render(<App/>);
    fireEvent.change(getByPlaceholderText('Age'), { target: { value: 'abc@de123com' } });

    expect(getByTestId('age')).toHaveTextContent('The age must be a number.');
    expect(getByPlaceholderText('Age')).toHaveValue('abc@de123com');
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
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'abc@de123com' } });

    expect(getByTestId('username')).toHaveTextContent('The userName field must contain only alphabetic characters.');
    expect(getByPlaceholderText('Username')).toHaveValue('abc@de123com');

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: ' ' } });

    expect(getByTestId('username')).toHaveTextContent('The userName field cannot be empty.');
    expect(getByPlaceholderText('Username')).toHaveValue(' ');

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'Eazybee' } });

    let element;

    try {
      element = getByTestId('username');
    } catch (error) {
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="username"]')).toBeTruthy();
    }

    expect(getByPlaceholderText('Username')).toHaveValue('Eazybee');
  });

  it('should submit and render table on valid data input', () => {
    const {
      getByTestId, getByPlaceholderText, getByText,
    } = render(<App/>);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'EazyBee' } });
    fireEvent.change(getByPlaceholderText('Age'), { target: { value: '12' } });
    fireEvent.click(getByText('Submit'));

    expect(getByTestId('table')).toBeTruthy();
    expect(getByTestId('table')).toContainElement(getByTestId('userName0'));
    expect(getByTestId('table')).toContainElement(getByTestId('age1'));
  });

  it('should not submit and render table on valid data input', () => {
    const {
      getByTestId, getByPlaceholderText, getByText,
    } = render(<App/>);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: '1Eazyb' } });
    fireEvent.change(getByPlaceholderText('Age'), { target: { value: '12' } });
    fireEvent.click(getByText('Submit'));

    let element;

    try {
      element = getByTestId('table');
    } catch (error) {
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="table"]')).toBeTruthy();
      expect(getByTestId('username')).toHaveTextContent('The userName field must contain only alphabetic characters.');
    }
  });
});
