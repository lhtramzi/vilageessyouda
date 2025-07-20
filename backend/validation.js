// backend/validation.js

function validateJoinRequest({ name, roomCode }) {
  if (!name || typeof name !== 'string' || name.length < 2) {
    return { valid: false, reason: 'الاسم غير صالح' };
  }
  if (!roomCode || typeof roomCode !== 'string' || roomCode.length < 3) {
    return { valid: false, reason: 'رمز الغرفة غير صالح' };
  }
  return { valid: true };
}

function validateRoleList(roles, playerCount) {
  const total = roles.reduce((sum, role) => sum + role.count, 0);
  if (total !== playerCount) {
    return {
      valid: false,
      reason: `عدد الأدوار (${total}) لا يساوي عدد اللاعبين (${playerCount})`
    };
  }
  return { valid: true };
}

module.exports = {
  validateJoinRequest,
  validateRoleList
};
