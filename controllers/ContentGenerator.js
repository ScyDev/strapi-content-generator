'use strict';

const PLUGIN_ID = 'content-generator';

const validator = require('./validations');

module.exports = {
  generateContent: async (ctx) => {
    const generatorService = strapi.plugins[PLUGIN_ID].services['contentgenerator'];
    const validationResult = validator.validateGenerateContentRequest(ctx.request.body);
    if (validationResult) {
      //console.log({body: ctx.request.body});
      ctx.throw(400, validationResult);
      return;
    }
    await generatorService.generateData(ctx);
    ctx.send({
      message: 'ok',
    });
  },
  deleteAllContent: async (ctx) => {
    const generatorService = strapi.plugins[PLUGIN_ID].services['contentgenerator'];
    const validationResult = validator.validateDeleteRequest(ctx.request.body);
    if (validationResult) {
      ctx.throw(400, validationResult);
      return;
    }
    const count = await generatorService.deleteAllData(
      ctx.request.body.targetModelUid, ctx);
    ctx.send({
      message: 'ok',
      count,
    });
  }
};
