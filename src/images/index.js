var context = require.context('.', true, /\.(png|jpe?g|svg)$/);
var images = {};
context.keys().forEach(function (key) {
  images[key.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = context(key);
});
export default images;
