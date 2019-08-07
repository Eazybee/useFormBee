const pascalCase = (attribute) => {
  let field = attribute;
  field = `${field.slice(0, 1).toLowerCase()}${field.slice(1, field.lenght)}`;
  return field;
};

const camelCase = (attribute) => {
  let field = attribute;
  const res = field.match(new RegExp('[A-Z]', 'g'));
  let start = 0;

  if (res) {
    res.forEach((found) => {
      const ind = field.indexOf(found, start);

      field = `${field.slice(0, ind)} ${field.slice(ind, field.lenght)}`;
      start = ind + 2;
    });
  }
  return field.toLowerCase();
};

const snakeCase = (attribute) => {
  let field = attribute;
  const res = field.match(new RegExp('_', 'g'));
  if (res) {
    res.forEach(() => {
      field = field.replace('_', ' ');
    });
  }

  return field.toLowerCase();
};

const formatter = (attribute) => {
  let field = pascalCase(attribute);
  field = camelCase(field);
  field = snakeCase(field);
  return field;
};

export default formatter;
