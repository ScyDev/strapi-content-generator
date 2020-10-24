import {deleteAllContent, generateContent} from "../ContentGenerator";

describe('# Controller', () => {
  const setUpStrapi = (serviceMock) => {
    global.strapi = {
      plugins: {
        ['content-generate']: {
          services: {
            contentgenerator: serviceMock
          }
        }
      }
    }
  };

  it('should throw 400 if required parameters not exist', async () => {
    const generateData = jest.fn();
    const throwFn = jest.fn();
    setUpStrapi({
      generateData,
    });
    const cxt = {
      throw: throwFn,
      request: {
        body: {}
      }
    };
    await generateContent(cxt);
    expect(generateData).not.toHaveBeenCalled();
    expect(throwFn).toHaveBeenCalledTimes(1);
    expect(throwFn).toHaveBeenCalledWith(400, expect.anything());
  });

  it('should generate data', async () => {
    const generateData = jest.fn();
    const throwFn = jest.fn();
    const sendFn = jest.fn();
    setUpStrapi({
      generateData,
    });
    const cxt = {
      throw: throwFn,
      send: sendFn,
      request: {
        body: {
          targetModel: 'uid',
          source: { id: 1 },
          kind: 'singleType',
        }
      }
    };
    await generateContent(cxt);
    expect(throwFn).not.toHaveBeenCalled();
    expect(generateData).toHaveBeenCalledTimes(1);
    expect(generateData).toHaveBeenCalledWith(cxt);
    expect(sendFn).toHaveBeenCalled();
  });

  it('should throw 400 if required parameters not exist', async () => {
    const deleteAllData = jest.fn();
    const throwFn = jest.fn();
    setUpStrapi({
      deleteAllData,
    });
    const cxt = {
      throw: throwFn,
      request: {
        body: {}
      }
    };
    await deleteAllContent(cxt);
    expect(deleteAllData).not.toHaveBeenCalled();
    expect(throwFn).toHaveBeenCalledTimes(1);
    expect(throwFn).toHaveBeenCalledWith(400, expect.anything());
  });
  it('should delete data by content type', async () => {
    const deleteAllData = jest.fn();
    const throwFn = jest.fn();
    const sendFn = jest.fn();
    setUpStrapi({
      deleteAllData,
    });
    const cxt = {
      throw: throwFn,
      send: sendFn,
      request: {
        body: {
          targetModelUid: 'uid',
        }
      }
    };
    await deleteAllContent(cxt);
    expect(throwFn).not.toHaveBeenCalled();
    expect(deleteAllData).toHaveBeenCalledTimes(1);
    expect(sendFn).toHaveBeenCalled();
  });
});
