import {
  validateDeleteRequest,
  validateGenerateContentRequest
} from "../validations";

describe('# Request body validation', () => {
  it('should validate all required parameters appear', () => {
    expect(validateGenerateContentRequest({})).not.toBeUndefined();
    expect(validateDeleteRequest({})).not.toBeUndefined();
  });
  it('should pass when all required parameters appear', () => {
    expect(validateGenerateContentRequest({
      targetModel: 'uid',
      source: [{ id: 1 }],
      kind: 'collectionType',
    })).toBeUndefined();
    expect(validateDeleteRequest({
      targetModelUid: 'test-id'
    })).toBeUndefined();
  })
});
