// backend/logger.js

const info = (msg) => {
  console.log(`ℹ️ [INFO]: ${msg}`);
};

const warn = (msg) => {
  console.warn(`⚠️ [WARN]: ${msg}`);
};

const error = (msg) => {
  console.error(`❌ [ERROR]: ${msg}`);
};

module.exports = {
  info,
  warn,
  error
};
