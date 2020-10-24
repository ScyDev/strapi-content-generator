import {deleteAll, generateData} from "../api";
import * as strapiHelper from "strapi-helper-plugin";

jest.mock("strapi-helper-plugin");

describe('# Api helpers', () => {
  it('should call generate content api', async () => {
    const request = jest.fn();
    strapiHelper.request.mockImplementation(request);
    await generateData({id: 1});
    expect(request).toBeCalledTimes(1);
    expect(request).toBeCalledWith('/content-generate/generate', {
      method: 'POST',
      body: {id: 1}
    });
  });

  it('should call delete all api', async () => {
    const request = jest.fn();
    strapiHelper.request.mockImplementation(request);
    await deleteAll('uid');
    expect(request).toBeCalledTimes(1);
    expect(request).toBeCalledWith('/content-generate/delete-all', {
      method: 'POST',
      body: {targetModelUid: 'uid'}
    });
  })
});
