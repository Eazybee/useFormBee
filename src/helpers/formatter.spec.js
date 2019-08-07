import formatter from './formatter';

describe('App Component', () => {
  it('should format PasCal name convention', () => {
    const pascalCase = 'PasCal';
    const formatted = formatter(pascalCase);

    expect(formatted).not.toBe(pascalCase);
    expect(formatted).toBe('pas cal');
  });

  it('should format camelCase name convention', () => {
    const camelCase = 'camelCaseConvention';
    const formatted = formatter(camelCase);

    expect(formatted).not.toBe(camelCase);
    expect(formatted).toBe('camel case convention');
  });

  it('should format sanke_case name convention', () => {
    const snakeCase = 'snake_case_convention';
    const formatted = formatter(snakeCase);

    expect(formatted).not.toBe(snakeCase);
    expect(formatted).toBe('snake case convention');
  });
});
