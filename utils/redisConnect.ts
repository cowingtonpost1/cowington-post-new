import redis from 'redis'
const redisConnect = () => {
	return redis.createClient(process.env.REDIS_URL)
}
export default redisConnect;

