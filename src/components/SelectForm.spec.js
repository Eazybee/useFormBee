import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectForm from './SelectForm';
import { validOptions, inValidOptions, rules } from '../../test/fixtures/selectForm';


afterEach(cleanup);

describe('SelectForm Component', () => {
  it('should render successfully', () => {
    const { container, getByText } = render(<SelectForm rules={rules} options={validOptions}/>);

    expect(container).toBeTruthy();
    expect(getByText('SIMI')).toBeTruthy();
    expect(getByText('MOSIMI')).toBeTruthy();
  });

  it('should submit on valid selected options', () => {
    const { getByTestId, getByText } = render(
      <SelectForm rules={rules} options={validOptions}/>,
    );

    fireEvent.change(getByTestId('friend'), { target: { value: 'simi' } });
    fireEvent.click(getByText('Submit'));

    expect(getByTestId('table')).toBeTruthy();
    expect(getByTestId('table')).toContainElement(getByText(validOptions[0].value));
  });

  it('should not submit if no option is selected', () => {
    let element;
    const { getByTestId, getByText } = render(
      <SelectForm rules={rules} options={inValidOptions} required/>,
    );

    fireEvent.click(getByText('Submit'));


    try {
      element = getByTestId('table');
    } catch (error) {
      expect(getByTestId('selectionError')).toBeTruthy();
      expect(getByTestId('selectionError')).toHaveTextContent('The friend field is required.');
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="table"]')).toBeTruthy();
    }
  });

  it('should not submit on invalid selected option', () => {
    let element;
    const { getByTestId, getByText } = render(
      <SelectForm rules={rules} options={inValidOptions} required/>,
    );

    fireEvent.change(getByTestId('friend'), { target: { value: '245' } });
    fireEvent.click(getByText('Submit'));


    try {
      element = getByTestId('table');
    } catch (error) {
      expect(getByTestId('selectionError')).toBeTruthy();
      expect(getByTestId('selectionError')).toHaveTextContent('The selected friend is invalid.');
      expect(element).toBe(undefined);
      expect(error).toBeTruthy();
      expect(error.message.includes('Unable to find an element by: [data-testid="table"]')).toBeTruthy();
    }
  });
});
