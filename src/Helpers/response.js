const success = (res, status, data) => {
    const objectResponse = {
      errorMsg: null,
      data,
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