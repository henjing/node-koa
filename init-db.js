// 初始化数据库
const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);