const success = (res, status, result, info) => {
  const objectResponse = {
    errorMsg: null,
    result,
    info,
  };
  res.status(status).json(objectResponse);
};

const error = (res, status, errorMsg) => {
  const objectResponse = {
    errorMsg,
    data: null,
  };
  res.status(status).json(objectResponse);
};

module.exports = {
  success,
  error,
};
