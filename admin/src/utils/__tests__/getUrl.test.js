import {getUrl} from "../getUrl";

describe('# Get url', () => {
  it('should create url by plugin id and path', () => {
    expect(getUrl('my-plugin', 'generate')).toBe('/plugins/my-plugin/generate');
    expect(getUrl('my-plugin')).toBe('/plugins/my-plugin');
  });
});
