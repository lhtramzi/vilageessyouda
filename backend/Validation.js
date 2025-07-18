// backend/validation.js

Function validateJoinRequest({ name, roomCode }) {
  If ( !name || typeof name !== ‘string’ || name.length < 2) {
    Return { valid : false, reason : ‘الاسم غير صالح’ } ;
  }
  If ( !roomCode || typeof roomCode !== ‘string’ || roomCode.length < 3) {
    Return { valid : false, reason : ‘رمز الغرفة غير صالح’ } ;
  }
  Return { valid : true } ;
}

Function validateRoleList(roles, playerCount) {
  Const total = roles.reduce((sum, role) => sum + role.count, 0) ;
  If (total !== playerCount) {
    Return {
      Valid : false,
      Reason : `عدد الأدوار (${total}) لا يساوي عدد اللاعبين (${playerCount})`
    } ;
  }
  Return { valid : true } ;
}

Module.exports = {
  validateJoinRequest,
  validateRoleList
} ;
