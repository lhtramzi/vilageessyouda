// backend/utils.js

Function shuffleArray(array) {
  For (let i = array.length – 1 ; i > 0 ; i--) {
    Const j = Math.floor(Math.random() * (i + 1)) ;
    [array[i], array[j]] = [array[j], array[i]] ;
  }
  Return array ;
}

Function generateRoomCode(length = 5) {
  Const chars = ‘ABCDEFGHJKLMNPQRSTUVWXYZ23456789’ ; // بدون أحرف مربكة مثل I, O, 0, 1
  Let code = ‘’ ;
  For (let i = 0 ; i < length ; i++) {
    Code += chars.charAt(Math.floor(Math.random() * chars.length)) ;
  }
  Return code ;
}

Module.exports = {
  shuffleArray,
  generateRoomCode
} ;