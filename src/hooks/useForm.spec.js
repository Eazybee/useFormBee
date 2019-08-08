import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './useForm';
import {
  callback, rules, event, getEvent, checkBoxEvent, multipleSelectEvent,
} from '../../test/fixtures/useForm';


describe('userForm hook', () => {
  it(' should render', () => {
    const { result } = renderHook(() => useForm({ callback, rules }));
    const {
      values, errors, handleChange, handleSubmit, handleReset,
    } = result.current;

    expect(values.age).toBe('');
    expect(errors.age).toBe(undefined);
    expect(values.username).toBe('');
    expect(errors.ausername).toBe(undefined);
    expect(typeof handleChange).toBe('function');
    expect(typeof handleSubmit).toBe('function');
    expect(typeof handleReset).toBe('function');
  });

  describe('handleChange function', () => {
    it('should update username field value', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));
      const { handleChange } = result.current;
      let valid;

      act(() => {
        valid = handleChange(event);
      });

      const {
        values: { username }, errors,
      } = result.current;

      expect(valid).toBe(true);
      expect(username).toBe('EazyBee');
      expect(errors.username).toBe(undefined);
    });

    it('should have error when passed empty string for a required field',
      () => {
        const { result } = renderHook(() => useForm({ callback, rules }));
        const { handleChange } = result.current;
        let valid;

        act(() => {
          valid = handleChange(getEvent({ required: true, value: ' ' }));
        });

        const { values: { username }, errors } = result.current;

        expect(valid).toBe(false);
        expect(username).toBe(' ');
        expect(errors.username).toBe('The username field cannot be empty.');
      });

    it('should have error when passed data with invalid data type', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));
      const { handleChange } = result.current;
      let valid;

      act(() => {
        valid = handleChange(getEvent({ required: true, value: '1234' }));
      });

      const { values: { username }, errors } = result.current;

      expect(valid).toBe(false);
      expect(username).toBe('1234');
      expect(errors.username)
        .toBe('The username field must contain only alphabetic characters.');
    });

    it('should update checkbox', () => {
      const { result } = renderHook(() => useForm({ callback, rules: { agreement: 'required|boolean' } }));
      const { handleChange } = result.current;
      let valid;

      act(() => {
        valid = handleChange(getEvent(checkBoxEvent));
      });

      const { values: { agreement }, errors } = result.current;

      expect(valid).toBe(true);
      expect(agreement).toBe(true);
      expect(errors.agreement).toBe(undefined);
    });

    it('should update checkbox and display required messaged for a required field', () => {
      const { result } = renderHook(() => useForm({ callback, rules: { agreement: 'required|boolean' } }));
      const { handleChange } = result.current;
      let valid;

      act(() => {
        valid = handleChange(getEvent({ ...checkBoxEvent, checked: false, required: true }));
      });

      const { values: { agreement }, errors } = result.current;

      expect(valid).toBe(false);
      expect(agreement).toBe(false);
      expect(errors.agreement).toBe('The agreement must be accepted.');
    });

    it('should update multiple select', () => {
      const { result } = renderHook(() => useForm({
        callback, rules: { friends: ['alpha', { in: ['simi', 'mosimi', 'eazybee'] }] },
      }));
      const { handleChange } = result.current;
      let valid;

      act(() => {
        valid = handleChange(getEvent(multipleSelectEvent));
      });

      const { values: { friends }, errors } = result.current;

      expect(valid).toBe(true);
      expect(Array.isArray(friends)).toBe(true);
      expect(friends[0]).toBe('simi');
      expect(friends[1]).toBe('mosimi');
      expect(errors.friends).toBe(undefined);
    });
  });

  describe('handleSubmit function', () => {
    it('should submit and call calback function', () => {
      const { result } = renderHook(() => useForm(
        { callback, rules: { username: 'alpha' } },
      ));

      const { handleSubmit } = result.current;

      let callbackResponse;
      act(() => {
        callbackResponse = handleSubmit({ preventDefault: () => '' });
      });

      expect(callbackResponse).toBeInstanceOf(Array);
      expect(callbackResponse.length).toBe(2);
      expect(callbackResponse[0]).toBe('callback called');
    });

    it('should not submit nor call calback function', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));
      const { handleSubmit } = result.current;

      let callbackResponse;
      act(() => {
        callbackResponse = handleSubmit({ preventDefault: () => '' });
      });

      const { values: { username }, errors } = result.current;

      expect(callbackResponse).toBe(false);
      expect(username).toBe('');
      expect(errors.username).toBe('The username field is required.');
    });
  });

  describe('handleReset function', () => {
    it('should clear all inputs field when called', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));

      const { handleReset } = result.current;

      act(() => {
        handleReset();
      });

      const {
        values: { username }, errors,
      } = result.current;

      expect(username).toBe('');
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
