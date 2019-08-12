export const rules = {
  friend: ['required', { in: ['simi', 'mosimi'] }],
};

export const validOptions = [
  {
    value: 'simi',
    text: 'SIMI',
  },
  {
    value: 'mosimi',
    text: 'MOSIMI',
  },
];

export const inValidOptions = [
  {
    value: '245',
    text: 'InvalidOption',
  },
  {
    value: 'mosimi',
    text: 'MOSIMI',
  },
];
