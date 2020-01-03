export default {
  cursorEncode: function (after) {
    return Buffer.from(`cursor:v1:${after}`).toString('base64');
  },
  cursorDecode: function (after) {
    if (!after) {
      return null;
    }
    const match = Buffer.from(after, 'base64').toString('ascii').match(/^cursor:v1:(.*)/);
    if (match) {
      return match[1];
    }
  }
};
