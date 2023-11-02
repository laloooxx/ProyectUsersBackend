//trabajar con la cache de la bd redis
const redis = require('redis');

const redisClient = redis.createClient({
    host: '31.187.76.251',
    port: 6379
});

redisClient.on('error', err => console.log('Redis client error', err))



module.exports = redisClient;