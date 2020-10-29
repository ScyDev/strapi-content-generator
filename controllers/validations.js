const validateGenerateContentRequest = (body) => {
  const { targetModel, source, generateCount, kind } = body;
  if (!targetModel || !source || !generateCount || !kind) {
    return 'Required parameters missing';
  }
  return undefined;
};

const validateDeleteRequest = (body) => {
  const { targetModelUid } = body;
  return (targetModelUid) ? undefined : 'Target content type undefined';
};

module.exports = {
  validateGenerateContentRequest,
  validateDeleteRequest,
};
