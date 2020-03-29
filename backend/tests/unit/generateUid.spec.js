const generateUid = require('../../src/utils/generateUid');

describe('Generate Unique ID', () => {
  it('should generate an unique id', () => {
    const id = generateUid();

    expect(id).toHaveLength(8);
  });
});
