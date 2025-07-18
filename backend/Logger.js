// backend/logger.js

Const info = (msg) => {
  Console.log(`ℹ️ [INFO] : ${msg}`) ;
} ;

Const warn = (msg) => {
  Console.warn(`️ [WARN] : ${msg}`) ;
} ;

Const error = (msg) => {
  Console.error(`❌ [ERROR] : ${msg}`) ;
} ;

Exports = {
  validateJoinRequest,
  validateRoleList
} ;


// backend/logger.js

Const info = (msg) => {
  Console.log(`ℹ️ [INFO] : ${msg}`) ;
} ;

Const warn = (msg) => {
  Console.warn(`️ [WARN] : ${msg}`) ;
} ;

Const error = (msg) => {
  Console.error(`❌ [ERROR] : ${msg}`) ;
} ;

Module.exports = {
  Info,
  Warn,
  Error
};
