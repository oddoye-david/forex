import { stripCommas } from '../src/utils';

describe('Utils test', () => {
  it('Should not accept non string input', () => {
    expect(() => stripCommas(42)).toThrow();
  });

  it('Should accept strings', () => {
    expect(() => stripCommas('42')).not.toThrow();
  });

  it('Should remove commas', () => {
    const result = stripCommas('42,000');
    expect(result).toEqual('42000');
  });
});
