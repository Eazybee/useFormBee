
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

export const checkBoxEvent = {
  type: 'checkbox', checked: true, name: 'agreement', required: true,
};

export const multipleSelectEvent = {
  type: 'select-multiple',
  name: 'friends',
  value: '',
  options: {
    0: {
      selected: true,
      value: 'simi',
    },
    1: {
      selected: true,
      value: 'mosimi',
    },
    2: {
      selected: false,
      value: 'eazybee',
    },
  },
};

export const getEvent = newValues => ({
  target: {
    ...event.target,
    ...newValues,
  },
});

export const callback = values => ['callback called', values];
