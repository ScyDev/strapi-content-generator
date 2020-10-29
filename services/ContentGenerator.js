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
    // get count of categories
    let categoryCount = 0;
    const categoryResult = await strapi
      .query('category')
      .model.query(qb => {
        //qb.where('id', 1);
        qb.count('id').then((count) => {
          console.log('number of categories', count)
          categoryCount = count;
        });
      })
      .fetch();

    // get count of images
    let imageCount = 0;
    //imageCount = await strapi.query('file', 'upload').countSearch("");
    imageCount = await strapi.query('file', 'upload').count();
    console.log({imageCount: imageCount});

    // generate content
    const { targetModel, source, generateCount, kind } = ctx.request.body;
    try {
      if (kind === 'collectionType' && Array.isArray(source)) {
        console.log({targetModel: targetModel});
        if (source.length > 0) {
          let multiplier = generateCount;
          for (let k = 0; k < multiplier; k++) {
            if (targetModel == "application::product.product") {

              source[0].id = null; //uuid(); // null generates new id for new entry
              source[0].slug = uuid(); //Date.now()
              source[0].title = loremIpsum({count: 5, units: "words"}).toUpperCase();
              source[0].description = loremIpsum({count: 30, units: "words"});
              source[0].price = Math.floor(Math.random() * Math.floor(2000.00)) + (Math.floor(Math.random() * Math.floor(99.00)) / 100.0);

              // use random category for product
              source[0].categories[0].id = 1 + Math.floor(Math.random() * Math.floor(parseInt(categoryCount[0].count) - 1));
              console.log({categoryForProduct: source[0].categories[0].id});

              // use random image for product
              source[0].image.id = 1 + Math.floor(Math.random() * Math.floor(parseInt(imageCount) - 1));
              console.log({imageForProduct: source[0].image.id});
            }

            if (targetModel == "application::category.category") {
              source[0].id = null;
              source[0].name = loremIpsum({count: 2, units: "words"}).toUpperCase();
              source[0].slug = uuid();
            }

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
