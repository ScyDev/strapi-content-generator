'use strict';

const utils  = require('./utils/content');
const _ = require('lodash');

/**
 * ContentGenerator.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  generateData: async (ctx) => {
    const { targetModel, source, kind } = ctx.request.body;
    try {
      if (kind === 'collectionType' && Array.isArray(source)) {
        for (let i = 0; i < source.length; i++) {
          //console.log(source[i]);
          let multiplier = 100000;
          for (let k = 0; k < multiplier; k++) {
            //await uitls.importItemByContentType(targetModel, source[i])
            source[i].id = i*multiplier + k; // make id unique by spacing it far apart
            source[i].slug = source[i].id;
            //console.log(source[i]);
            await utils.generateItemByContentType(targetModel, source[i])
          }
        }
      } else {
        await utils.generateSingleType(targetModel, source);
      }
    } catch (e) {
      ctx.throw(409, e.message);
    }
  },
  deleteAllData: async (targetModelUid, ctx) => {
    try {
      const all = await uitls.findAll(targetModelUid);
      const ids = _.map(all, (item) => item.id);
      await utils.deleteByIds(targetModelUid, ids);
      return all.length;
    } catch (e) {
      ctx.throw(409, e.message);
    }
  }
};
