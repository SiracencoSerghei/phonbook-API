const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

console.log('DB_HOST', DB_HOST)

const mongoConnect = async () => {
await mongoose.connect(DB_HOST)
}

module.exports = mongoConnect