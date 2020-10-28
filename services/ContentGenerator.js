'use strict';

const utils  = require('./utils/content');
const _ = require('lodash');
const uuid = require('uuid-random');

const loremIpsum = require("lorem-ipsum").loremIpsum;

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
        if (source.length > 0) {
          //console.log(source[i]);
          let multiplier = 20;
          for (let k = 0; k < multiplier; k++) {
            source[0].id = null; //uuid(); // null generates new id for new entry
            source[0].slug = uuid(); //Date.now()
            source[0].title = loremIpsum({count: 5, units: "words"}).toUpperCase();
            source[0].description = loremIpsum({count: 30, units: "words"});
            source[0].price = Math.floor(Math.random() * Math.floor(2000.00)) + (Math.floor(Math.random() * Math.floor(99.00)) / 100.0);
            //console.log(source[i]);
            await utils.generateItemByContentType(targetModel, source[0])
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
