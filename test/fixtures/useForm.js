
export const rules = {
  username: 'required|alpha',
  age: 'numeric',
};

export const event = {
  target: {
    value: 'EazyBee',
    name: 'username',
  },
};

export const getEvent = newValues => ({
  target: {
    ...event.target,
    ...newValues,
  },
});

export const callback = values => ['callback called', values];
