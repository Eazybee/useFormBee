import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './useForm';
import {
  callback, rules, event, getEvent,
} from '../../test/fixtures/useForm';


describe('userForm hook', () => {
  it(' should render', () => {
    const { result } = renderHook(() => useForm({ callback, rules }));
    const {
      values, errors, handleChange, handleSubmit,
    } = result.current;

    expect(values.age).toBe('');
    expect(errors.age).toBe(undefined);
    expect(values.username).toBe('');
    expect(errors.ausername).toBe(undefined);
    expect(typeof handleChange).toBe('function');
    expect(typeof handleSubmit).toBe('function');
  });

  describe('handleChange function', () => {
    it('should update username value', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));
      const { handleChange } = result.current;

      act(() => {
        handleChange(event);
      });

      const {
        values: { username }, errors,
      } = result.current;

      expect(username).toBe('EazyBee');
      expect(errors.username).toBe(undefined);
    });

    it('should have error when passed empty string for a required field',
      () => {
        const { result } = renderHook(() => useForm({ callback, rules }));
        const { handleChange } = result.current;

        act(() => {
          handleChange(getEvent({ required: true, value: ' ' }));
        });

        const { values: { username }, errors } = result.current;

        expect(username).toBe(' ');
        expect(errors.username).toBe('The username field cannot be empty.');
      });

    it('should have error when passed data with invalid data type', () => {
      const { result } = renderHook(() => useForm({ callback, rules }));
      const { handleChange } = result.current;

      act(() => {
        handleChange(getEvent({ required: true, value: '1234' }));
      });

      const { values: { username }, errors } = result.current;

      expect(username).toBe('1234');
      expect(errors.username)
        .toBe('The username field must contain only alphabetic characters.');
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
});
