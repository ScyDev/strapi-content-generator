import utils from '../utils/content';
import service from '../ContentGenerator';
jest.mock('../utils/content');

describe('# Service', () => {
  const mockCxt = (body) => ({
    request: { body },
  });

  it('should generate collection type content one by one', async () => {
    const generateItemByContentType = jest.fn();
    const collectionCxt = mockCxt({
      targetModel: 'uid',
      source: [{
        id: 1,
      }, {
        id: 2
      }],
      kind: 'collectionType',
    });
    utils.generateItemByContentType.mockImplementation(generateItemByContentType);
    await service.generateData(collectionCxt);
    expect(generateItemByContentType).toHaveBeenCalledTimes(2);
  });

  it('should use update for single type content', async () => {
    const generateSingleType = jest.fn();
    const singleCxt = mockCxt({
      targetModel: 'uid',
      source: { id: 1 },
      kind: 'singleType',
    });
    utils.generateSingleType.mockImplementation(generateSingleType);
    await service.generateData(singleCxt);
    expect(generateSingleType).toHaveBeenCalledTimes(1);
  });

  it('should delete content by ids and return deleted count', async () => {
    const deleteAll = jest.fn();
    const deleteCtx = mockCxt({});
    utils.findAll.mockImplementation(() => [{ id: 1 }, {id: 13 }]);
    utils.deleteByIds.mockImplementation(deleteAll);
    await service.deleteAllData('uid', deleteCtx);
    expect(deleteAll).toBeCalledTimes(1);
    expect(deleteAll).toBeCalledWith('uid', [1, 13]);
  });
});
