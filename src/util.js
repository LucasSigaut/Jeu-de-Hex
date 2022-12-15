module.exports.randomStr = (l = 32) => {
  let r = '';
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < l; i += 1) r += c[Math.floor(Math.random() * 62)];
  return r;
}
